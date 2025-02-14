import { getServerSession } from "next-auth";
import { Chat } from "@/components/Chat";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex flex-col mt-2 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold text-center">Welcome to Chat</h1>

      {!session?.user?.email && <div>You need to log in to use this chat</div>}

      {session?.user?.email && (
        <>
          <Separator className="my-5" />
          <Chat />
        </>
      )}
    </main>
  );
}
