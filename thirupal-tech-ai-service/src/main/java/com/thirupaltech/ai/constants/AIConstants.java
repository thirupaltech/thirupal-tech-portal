package com.thirupaltech.ai.constants;

public final class AIConstants {

    public static final String CHAT_API_PATH = "/api/v1/community-ai";
    public static final int MAX_MESSAGE_LENGTH = 2000;

    public static final String VALIDATION_ERROR_CODE = "VALIDATION_ERROR";
    public static final String INVALID_REQUEST_ERROR_CODE = "INVALID_REQUEST";
    public static final String INTERNAL_ERROR_CODE = "INTERNAL_ERROR";
    public static final String PROVIDER_ERROR_CODE = "AI_PROVIDER_ERROR";
    public static final String PROVIDER_UNAVAILABLE_ERROR_CODE = "AI_PROVIDER_UNAVAILABLE";
    public static final String RATE_LIMIT_ERROR_CODE = "AI_RATE_LIMITED";
    public static final String EMPTY_RESPONSE_ERROR_CODE = "AI_EMPTY_RESPONSE";

    private AIConstants() {
    }
}
