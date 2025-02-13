import { sql } from "@vercel/postgres";

import type { ChatWithMessages, Message } from "../types";

export async function createChat(
  name: string,
  userEmail: string,
  messages: Message[]
): Promise<number> {
  await sql`INSERT INTO chats (name, user_email) VALUES (${name}, ${userEmail})`;

  const { rows: lastInsertedId } =
    await sql`SELECT currval(pg_get_serial_sequence('chats', 'id'))`;
  const chatId = lastInsertedId[0].currval;

  for (const message of messages) {
    await sql`INSERT INTO messages (chat_id, role, content) VALUES (${chatId}, ${message.role}, ${message.content})`;
  }

  return chatId;
}

export async function getChatById(
  chatId: number
): Promise<ChatWithMessages | null> {
  const { rows: chats } = await sql`SELECT * FROM chats WHERE id = ${chatId}`;
  if (!chats[0]) {
    return null;
  }

  const { rows: messages } =
    await sql`SELECT * FROM messages WHERE chat_id = ${chatId}`;

  return {
    ...chats[0],
    messages: messages.map((message) => ({
      ...message,
      role: message.role as "user" | "assistant",
      content: message.content,
    })),
  } as ChatWithMessages;
}

export async function getChatsWithMessages(
  userEmail: string
): Promise<ChatWithMessages[]> {
  const { rows: chats } =
    await sql`SELECT * FROM chats WHERE user_email = ${userEmail}`;

  for (const chat of chats) {
    const { rows: messages } =
      await sql`SELECT * FROM messages WHERE chat_id = ${chat.id}`;
    chat.messages = messages.map((message) => ({
      ...message,
      role: message.role as "user" | "assistant",
      content: message.content,
    }));
  }

  return chats as ChatWithMessages[];
}

export async function getMessages(chatId: number): Promise<Message[]> {
  const { rows: messages } =
    await sql`SELECT * FROM messages WHERE chat_id = ${chatId}`;
  return messages.map((message) => ({
    ...messages,
    role: message.role as "user" | "assistant",
    content: message.content,
  }));
}

export async function updateChat(
  chatId: number,
  messages: Message[]
): Promise<void> {
  await sql`DELETE FROM messages WHERE chat_id = ${chatId}`;

  for (const message of messages) {
    await sql`INSERT INTO messages (chat_id, role, content) VALUES (${chatId}, ${message.role}, ${message.content})`;
  }
}
