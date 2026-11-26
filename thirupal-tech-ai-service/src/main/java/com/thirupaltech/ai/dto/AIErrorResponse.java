package com.thirupaltech.ai.dto;

import java.time.Instant;

public record AIErrorResponse(
        Instant timestamp,
        int status,
        String code,
        String message,
        String path) {
}
