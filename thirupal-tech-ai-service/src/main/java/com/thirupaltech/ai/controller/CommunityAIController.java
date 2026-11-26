package com.thirupaltech.ai.controller;

import java.time.Instant;

import com.thirupaltech.ai.constants.AIConstants;
import com.thirupaltech.ai.dto.AIChatRequest;
import com.thirupaltech.ai.dto.AIChatResponse;
import com.thirupaltech.ai.service.CommunityAIService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(AIConstants.CHAT_API_PATH)
public class CommunityAIController {

    private static final Logger log = LoggerFactory.getLogger(CommunityAIController.class);

    private final CommunityAIService communityAIService;

    public CommunityAIController(CommunityAIService communityAIService) {
        this.communityAIService = communityAIService;
    }

    @PostMapping("/chat")
    public ResponseEntity<AIChatResponse> chat(@Valid @RequestBody AIChatRequest request) {
        long startTime = System.nanoTime();
        log.info("Incoming community AI chat request");
        try {
            String answer = communityAIService.chat(request.message());
            return ResponseEntity.ok(new AIChatResponse(answer, Instant.now()));
        } finally {
            long elapsedMillis = (System.nanoTime() - startTime) / 1_000_000;
            log.info("Community AI chat request completed in {} ms", elapsedMillis);
        }
    }
}
