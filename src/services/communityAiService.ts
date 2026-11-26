type CommunityAiResponse = {
  answer?: unknown;
  message?: unknown;
  error?: unknown;
  detail?: unknown;
};

const apiBaseUrl = (import.meta.env.VITE_COMMUNITY_AI_API_BASE_URL || "http://localhost:8082").replace(/\/$/, "");

export async function sendCommunityAiMessage(message: string): Promise<string> {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}/api/v1/community-ai/chat`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
  } catch {
    throw new Error("Unable to reach the Community AI service. Check that the backend is running on port 8082.");
  }

  const rawBody = await response.text();
  let result: CommunityAiResponse = {};

  if (rawBody) {
    try {
      result = JSON.parse(rawBody) as CommunityAiResponse;
    } catch {
      if (response.ok) {
        throw new Error("The Community AI service returned an invalid response.");
      }
    }
  }

  if (!response.ok) {
    const errorMessage = result.message ?? result.error ?? result.detail;
    throw new Error(typeof errorMessage === "string" ? errorMessage : `Community AI request failed (${response.status}). Please try again.`);
  }

  if (typeof result.answer !== "string" || !result.answer.trim()) {
    throw new Error("The Community AI service did not return an answer. Please try again.");
  }

  return result.answer;
}
