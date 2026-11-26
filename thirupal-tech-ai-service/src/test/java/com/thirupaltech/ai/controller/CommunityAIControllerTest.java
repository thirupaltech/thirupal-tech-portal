package com.thirupaltech.ai.controller;

import static org.hamcrest.Matchers.startsWith;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.thirupaltech.ai.exception.GlobalExceptionHandler;
import com.thirupaltech.ai.service.CommunityAIService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(CommunityAIController.class)
@Import(GlobalExceptionHandler.class)
class CommunityAIControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommunityAIService communityAIService;

    @Test
    void returnsAnswerAndTimestampForValidRequest() throws Exception {
        when(communityAIService.chat("What is ThirupalTech?"))
                .thenReturn("ThirupalTech is a community platform.");

        mockMvc.perform(post("/api/v1/community-ai/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"message":"What is ThirupalTech?"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.answer").value("ThirupalTech is a community platform."))
                .andExpect(jsonPath("$.timestamp").value(startsWith("20")));
    }

    @Test
    void rejectsEmptyMessageWithoutCallingService() throws Exception {
        mockMvc.perform(post("/api/v1/community-ai/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"message":" "}
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.message").value(
                        "The request is invalid. Check that message is present and does not exceed 2000 characters."));
        verifyNoInteractions(communityAIService);
    }

    @Test
    void rejectsMessageLongerThan2000Characters() throws Exception {
        String message = "a".repeat(2001);

        mockMvc.perform(post("/api/v1/community-ai/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"message\":\"" + message + "\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }
}
