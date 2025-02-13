"use client";

import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { getComplitaion } from "@/app/server-actions/getComplitation";

interface Message {
  role: "user" | "assistant";
  content:
    | string
    | {
        text: string;
        type: string;
      }[];
}

export default function Chat() {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const message = useRef<HTMLInputElement>(null);

  const onClick = async () => {
    if (!message.current?.value) return;

    const { messages } = await getComplitaion([
      ...currentMessages,
      {
        role: "user",
        content: message.current.value as string,
      },
    ]);

    setCurrentMessages(messages);
    message.current.value = "";
  };

  //console.log({ currentMessages });

  return (
    <div className="flex flex-col w-full gap-4">
      {currentMessages.map((message, index) => {
        const textMessage =
          Array.isArray(message.content) && message.content.length > 0
            ? message.content[0].text
            : message.content;

        return (
          <div
            key={index}
            className={`mb-5 flex flex-col ${
              message.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`${
                message.role === "user" ? "bg-blue-500" : "bg-gray-500"
              } px-8 rounded-md`}
            >
              {textMessage as string}
            </div>
          </div>
        );
      })}

      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
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
}
