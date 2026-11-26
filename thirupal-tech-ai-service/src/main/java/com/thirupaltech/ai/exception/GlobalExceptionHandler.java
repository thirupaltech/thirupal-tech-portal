package com.thirupaltech.ai.exception;

import java.time.Instant;

import com.thirupaltech.ai.constants.AIConstants;
import com.thirupaltech.ai.dto.AIErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(AIServiceException.class)
    public ResponseEntity<AIErrorResponse> handleAIServiceException(
            AIServiceException exception,
            HttpServletRequest request) {
        return errorResponse(exception.getStatus(), exception.getErrorCode(), exception.getMessage(), request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<AIErrorResponse> handleValidationException(HttpServletRequest request) {
        return errorResponse(
                HttpStatus.BAD_REQUEST,
                AIConstants.VALIDATION_ERROR_CODE,
                "The request is invalid. Check that message is present and does not exceed 2000 characters.",
                request);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<AIErrorResponse> handleUnreadableRequest(HttpServletRequest request) {
        return errorResponse(
                HttpStatus.BAD_REQUEST,
                AIConstants.INVALID_REQUEST_ERROR_CODE,
                "The request body is missing or malformed.",
                request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AIErrorResponse> handleUnexpectedException(
            Exception exception,
            HttpServletRequest request) {
        log.error("Unexpected request processing failure: {}", exception.getClass().getSimpleName());
        return errorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                AIConstants.INTERNAL_ERROR_CODE,
                "An unexpected error occurred.",
                request);
    }

    private ResponseEntity<AIErrorResponse> errorResponse(
            HttpStatus status,
            String code,
            String message,
            HttpServletRequest request) {
        AIErrorResponse response = new AIErrorResponse(
                Instant.now(),
                status.value(),
                code,
                message,
                request.getRequestURI());
        return ResponseEntity.status(status).body(response);
    }
}
