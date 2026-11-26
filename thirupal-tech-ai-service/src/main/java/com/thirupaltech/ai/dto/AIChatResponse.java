package com.thirupaltech.ai.dto;

import java.time.Instant;

public record AIChatResponse(String answer, Instant timestamp) {
}
