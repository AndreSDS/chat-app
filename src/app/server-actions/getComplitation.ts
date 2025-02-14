"use server";
import { getServerSession } from "next-auth";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { createChat, updateChat } from "@/db";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
});

const model = google("gemini-1.5-pro-latest");

interface MessageHistory {
  role: "user" | "assistant";
  content: string;
}

export async function getComplitaion(
  chatId: number | null,
  messageHistory: MessageHistory[]
) {
  const { response } = await generateText({
    model,
    prompt: messageHistory[0].content,
  });

  const messages = [
    ...messageHistory,
    {
      role: response.messages[0].role,
      content: response.messages[0].content[0].text,
    } as unknown as MessageHistory,
  ];

  const session = await getServerSession();
  let currentChatId = chatId;
  if (!chatId) {
    currentChatId = await createChat(
      session?.user?.name ?? "defaultName",
      session?.user?.email ?? "defaultEmail",
      messages
    );
  } else {
    await updateChat(chatId, messages);
  }

  return { messages, id: currentChatId };
}
