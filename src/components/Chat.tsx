"use client";

import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { getComplitaion } from "@/app/server-actions/getComplitation";
import { useRouter } from "next/navigation";
import Transcript from "./Transcript";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatProps {
  id?: number | null;
  initMessages?: Message[];
}

export const Chat = ({ id = null, initMessages = [] }: ChatProps) => {
  const router = useRouter();
  const [currentMessages, setCurrentMessages] =
    useState<Message[]>(initMessages);
  const message = useRef<HTMLInputElement>(null);
  const chatId = useRef<number | null>(id);

  const onClick = async () => {
    if (!message.current?.value) return;

    const { messages, id } = await getComplitaion(chatId.current, [
      ...currentMessages,
      {
        role: "user",
        content: message.current.value,
      },
    ]);

    if (!chatId.current) {
      router.push(`/chats/${id}`);
      router.refresh();
    }

    chatId.current = id;
    message.current.value = "";
    setCurrentMessages(messages);
  };

  return (
    <div className="flex flex-col w-full">
      <Transcript messages={currentMessages} truncate={false} />

      <div className="flex pt-3 mb-4">
        <Input
          ref={message}
          className="flex-grow text-xl"
          placeholder="Question"
        />
        <Button onClick={onClick} className="ml-3 text-xl">
          Send
        </Button>
      </div>
    </div>
  );
};
