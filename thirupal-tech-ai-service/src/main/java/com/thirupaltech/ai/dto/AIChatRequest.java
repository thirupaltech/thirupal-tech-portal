package com.thirupaltech.ai.dto;

import com.thirupaltech.ai.constants.AIConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AIChatRequest(
        @NotBlank(message = "Message must not be empty.")
        @Size(max = AIConstants.MAX_MESSAGE_LENGTH, message = "Message must not exceed 2000 characters.")
        String message) {
}
