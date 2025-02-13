"use server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
});

const model = google("gemini-1.5-pro-latest");

interface MessageHistory {
  role: "user" | "assistant";
  content:
    | string
    | {
        text: string;
        type: string;
      }[];
}

export async function getComplitaion(messageHistory: MessageHistory[]) {
  const { response } = await generateText({
    model,
    prompt: messageHistory[0].content as string,
  });

  const messages = [
    ...messageHistory,
    // get the role value and content from the response object
    {
      role: response.messages[0].role,
      content: response.messages[0].content,
    } as MessageHistory,
  ];

  return { messages };
}
