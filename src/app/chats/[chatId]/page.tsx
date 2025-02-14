import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Chat } from "@/components/Chat";
import { getChatById } from "@/db";

export const dynamic = "force-dynamic";

export default async function ChatDetails({
  params,
}: {
  params: { chatId: string };
}) {
  const { chatId } = await params;

  const chat = await getChatById(parseInt(chatId));
  if (!chat) {
    return notFound();
  }

  const session = await getServerSession();
  if (!session || chat?.user_email !== session?.user?.email) {
    return redirect("/");
  }

  return (
    <main className="pt-5">
      <Chat
        id={parseInt(chatId)}
        initMessages={chat?.messages || []}
        key={chatId}
      />
    </main>
  );
}
