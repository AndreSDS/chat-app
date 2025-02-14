import { Message } from "@/types";

const truncateText = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};

export default function Transcript({
  messages,
  truncate = true,
}: {
  messages: Message[];
  truncate?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            message.role === "user" ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`${
              message.role === "user" ? "bg-blue-500" : "bg-gray-500"
            } px-8 py-2 rounded-md`}
          >
            {truncate ? truncateText(message.content, 200) : message.content}
          </div>
        </div>
      ))}
    </div>
  );
}
