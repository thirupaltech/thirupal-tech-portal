package com.thirupaltech.ai.service;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import com.thirupaltech.ai.constants.AIConstants;
import com.thirupaltech.ai.exception.AIServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.beans.factory.annotation.Qualifier;

@Service
public class CommunityAIService {

    private static final Logger log = LoggerFactory.getLogger(CommunityAIService.class);

    private final ChatClient chatClient;
    private final String systemPrompt;
    private final AsyncTaskExecutor providerExecutor;
    private final Duration providerRequestTimeout;

    public CommunityAIService(
            ChatClient chatClient,
            @Value("${community-ai.system-prompt}") String systemPrompt,
            @Qualifier("aiProviderExecutor") AsyncTaskExecutor providerExecutor,
            @Value("${community-ai.provider.request-timeout:30s}") Duration providerRequestTimeout) {
        this.chatClient = chatClient;
        this.systemPrompt = systemPrompt;
        this.providerExecutor = providerExecutor;
        this.providerRequestTimeout = providerRequestTimeout;
    }

    public String chat(String message) {
        log.debug("Executing community AI provider request");
        Future<String> response;
        try {
            response = providerExecutor.submit(() -> chatClient.prompt()
                    .system(systemPrompt)
                    .user(message)
                    .call()
                    .content());
        } catch (RuntimeException exception) {
            log.warn("AI provider executor rejected a request");
            throw new AIServiceException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    AIConstants.PROVIDER_UNAVAILABLE_ERROR_CODE,
                    "The AI provider is temporarily unavailable.",
                    exception);
        }

        try {
            String answer = response.get(providerRequestTimeout.toMillis(), java.util.concurrent.TimeUnit.MILLISECONDS);
            if (answer == null || answer.isBlank()) {
                throw new AIServiceException(
                        HttpStatus.BAD_GATEWAY,
                        AIConstants.EMPTY_RESPONSE_ERROR_CODE,
                        "The AI provider returned an empty response.");
            }
            return answer.trim();
        } catch (TimeoutException exception) {
            response.cancel(true);
            throw new AIServiceException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    AIConstants.PROVIDER_UNAVAILABLE_ERROR_CODE,
                    "The AI provider request timed out.",
                    exception);
        } catch (InterruptedException exception) {
            response.cancel(true);
            Thread.currentThread().interrupt();
            throw new AIServiceException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    AIConstants.PROVIDER_UNAVAILABLE_ERROR_CODE,
                    "The AI provider request was interrupted.",
                    exception);
        } catch (ExecutionException exception) {
            Throwable providerFailure = exception.getCause();
            if (providerFailure instanceof RuntimeException runtimeException) {
                AIServiceException serviceException = mapProviderFailure(runtimeException);
                log.warn("AI provider request failed with {}", serviceException.getErrorCode());
                throw serviceException;
            }
            throw new AIServiceException(
                    HttpStatus.BAD_GATEWAY,
                    AIConstants.PROVIDER_ERROR_CODE,
                    "The AI provider request failed.",
                    providerFailure);
        } catch (AIServiceException exception) {
            throw exception;
        }
    }

    private AIServiceException mapProviderFailure(RuntimeException exception) {
        for (Throwable cause = exception; cause != null; cause = cause.getCause()) {
            if (cause instanceof RestClientResponseException responseException) {
                HttpStatus status = responseException.getStatusCode().value() == 429
                        ? HttpStatus.TOO_MANY_REQUESTS
                        : responseException.getStatusCode().is5xxServerError()
                                ? HttpStatus.SERVICE_UNAVAILABLE
                                : HttpStatus.BAD_GATEWAY;
                String errorCode = status == HttpStatus.TOO_MANY_REQUESTS
                        ? AIConstants.RATE_LIMIT_ERROR_CODE
                        : AIConstants.PROVIDER_ERROR_CODE;
                return new AIServiceException(status, errorCode, "The AI provider request failed.", exception);
            }
            if (cause instanceof ResourceAccessException
                    || cause instanceof IOException
                    || cause instanceof TimeoutException) {
                return new AIServiceException(
                        HttpStatus.SERVICE_UNAVAILABLE,
                        AIConstants.PROVIDER_UNAVAILABLE_ERROR_CODE,
                        "The AI provider is temporarily unavailable.",
                        exception);
            }
            String exceptionType = cause.getClass().getSimpleName().toLowerCase();
            if (exceptionType.contains("ratelimit") || exceptionType.contains("toomanyrequests")) {
                return new AIServiceException(
                        HttpStatus.TOO_MANY_REQUESTS,
                        AIConstants.RATE_LIMIT_ERROR_CODE,
                        "The AI provider is temporarily rate-limiting requests.",
                        exception);
            }
            if (exceptionType.contains("unavailable") || exceptionType.contains("serviceunavailable")) {
                return new AIServiceException(
                        HttpStatus.SERVICE_UNAVAILABLE,
                        AIConstants.PROVIDER_UNAVAILABLE_ERROR_CODE,
                        "The AI provider is temporarily unavailable.",
                        exception);
            }
        }
        return new AIServiceException(
                HttpStatus.BAD_GATEWAY,
                AIConstants.PROVIDER_ERROR_CODE,
                "The AI provider request failed.",
                exception);
    }
}
