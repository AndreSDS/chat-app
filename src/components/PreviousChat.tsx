import Link from "next/link";
import { getServerSession } from "next-auth";
import { getChatsWithMessages } from "@/db";
import Transcript from "@/components/Transcript";
import { Separator } from "@/components/ui/separator";

export default async function PreviousChat() {
  const session = await getServerSession();
  const chats = await getChatsWithMessages(session?.user?.email ?? "");

  return (
    <div>
      {chats.length > 0 && (
        <>
          <div className="text-2xl font-bold">Previous Chat Session</div>
          <div className="mt-1 border-2 rounded-xl w-full">
            <div className="text-lg px-5 py-2 text-white bg-blue-900 rounded-t-xl">
              {session?.user?.name}
            </div>
            <div className="flex flex-wrap gap-4 mt-4 mb-4 px-4">
              {chats.map((chat) => (
                <div key={`${chat.id}`} className="border-2 rounded-xl flex-1 h-auto min-w-[300px]">
                  <Link href={`/chats/${chat.id}`}>
                    <div className="p-3" key={chat.id}>
                      <Transcript messages={chat.messages.slice(0, 2)} />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Separator className="mt-5" />

      {chats.length === 0 && (
        <div className="flex justify-center">
          <div className="text-gray-500 italic text-2xl">
            No previous chats.
          </div>
        </div>
      )}
    </div>
  );
}
