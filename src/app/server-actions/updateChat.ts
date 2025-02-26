"use server";
import { getServerSession } from "next-auth";
import { createChat, updateChat as updateChatMessages } from "@/db";
import { Message } from "@/types";

export const updateChat = async (
  chatId: number | null,
  messages: Message[]
) => {
  const session = await getServerSession();

  if (!chatId) {
    return await createChat(
      session?.user?.email ?? "",
      messages[0].content,
      messages
    );
  } else {
    await updateChatMessages(chatId, messages);
    return chatId;
  }
};
