import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { Chat } from "@/components/Chat";
import PreviousChat from "@/components/PreviousChat";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex flex-col mt-2 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-center">Welcome to Chat</h1>

      {!session?.user?.email && <div>You need to log in to use this chat</div>}

      {session?.user?.email && (
        <>
          <Suspense fallback={<h1>Loading previous chat...</h1>}>
            <PreviousChat />
          </Suspense>
          <h4 className="mt-5 text-2xl font-bold"> New Chat Session</h4>
          <Separator className="my-5" />
          <Chat />
        </>
      )}
    </main>
  );
}
