"use client";

import { useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import Transcript from "./Transcript";
import { useChat } from "ai/react";
import type { Message as MessageAI } from "ai";
import { Message } from "@/types";
import { updateChat } from "@/app/server-actions/updateChat";

interface ChatProps {
  id?: number | null;
  initMessages?: Message[];
}

export const Chat = ({ id = null, initMessages = [] }: ChatProps) => {
  const {
    messages: currentMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    initialMessages: initMessages as unknown as MessageAI[],
    streamProtocol: "text",
  });

  const router = useRouter();

  const chatId = useRef<number | null>(id);

  useEffect(() => {
    (async () => {
      if (!isLoading && currentMessages.length) {
        const simplifiedMessages = currentMessages.map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        }));
        const newChatId = await updateChat(chatId.current, simplifiedMessages);
        if (chatId.current === null) {
          router.push(`/chat/${newChatId}`);
          router.refresh();
        } else {
          chatId.current = newChatId;
        }
      }
    })();
  }, [isLoading, currentMessages, router]);

  return (
    <div className="flex flex-col w-full">
      <Transcript messages={currentMessages as Message[]} truncate={false} />

      <form className="flex pt-3 mb-4" onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={handleInputChange}
          className="flex-grow text-xl"
          placeholder="Question"
        />
        <Button type="submit" className="ml-3 text-xl">
          Send
        </Button>
      </form>
    </div>
  );
};
