package com.thirupaltech.ai.exception;

import org.springframework.http.HttpStatus;

public class AIServiceException extends RuntimeException {

    private final HttpStatus status;
    private final String errorCode;

    public AIServiceException(HttpStatus status, String errorCode, String message) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
    }

    public AIServiceException(HttpStatus status, String errorCode, String message, Throwable cause) {
        super(message, cause);
        this.status = status;
        this.errorCode = errorCode;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
