package com.thirupaltech.ai.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.Duration;

import com.thirupaltech.ai.exception.AIServiceException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.task.SyncTaskExecutor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

class CommunityAIServiceTest {

    private final ChatClient chatClient = mock(ChatClient.class);
    private final ChatClient.ChatClientRequestSpec requestSpec = mock(ChatClient.ChatClientRequestSpec.class);
    private final ChatClient.CallResponseSpec callResponseSpec = mock(ChatClient.CallResponseSpec.class);
    private CommunityAIService service;

    @BeforeEach
    void setUp() {
        service = new CommunityAIService(chatClient, "system instructions", new SyncTaskExecutor(), Duration.ofSeconds(30));
        when(chatClient.prompt()).thenReturn(requestSpec);
        when(requestSpec.system(anyString())).thenReturn(requestSpec);
        when(requestSpec.user(anyString())).thenReturn(requestSpec);
        when(requestSpec.call()).thenReturn(callResponseSpec);
    }

    @Test
    void returnsNonEmptyProviderResponse() {
        when(callResponseSpec.content()).thenReturn("  Hello, community!  ");

        assertEquals("Hello, community!", service.chat("Hello"));
    }

    @Test
    void mapsProviderFailureToSanitizedException() {
        when(callResponseSpec.content()).thenThrow(new IllegalStateException("private provider response"));

        AIServiceException exception = assertThrows(AIServiceException.class, () -> service.chat("Hello"));

        assertEquals(HttpStatus.BAD_GATEWAY, exception.getStatus());
        assertEquals("AI_PROVIDER_ERROR", exception.getErrorCode());
        assertEquals("The AI provider request failed.", exception.getMessage());
    }

    @Test
    void mapsRateLimitToTooManyRequests() {
        HttpClientErrorException rateLimitException = HttpClientErrorException.create(
                HttpStatusCode.valueOf(429),
                "Too Many Requests",
                HttpHeaders.EMPTY,
                new byte[0],
                null);
        when(callResponseSpec.content()).thenThrow(rateLimitException);

        AIServiceException exception = assertThrows(AIServiceException.class, () -> service.chat("Hello"));

        assertEquals(HttpStatus.TOO_MANY_REQUESTS, exception.getStatus());
        assertEquals("AI_RATE_LIMITED", exception.getErrorCode());
    }

    @Test
    void rejectsEmptyProviderResponse() {
        when(callResponseSpec.content()).thenReturn("  ");

        AIServiceException exception = assertThrows(AIServiceException.class, () -> service.chat("Hello"));

        assertEquals(HttpStatus.BAD_GATEWAY, exception.getStatus());
        assertEquals("AI_EMPTY_RESPONSE", exception.getErrorCode());
    }
}
