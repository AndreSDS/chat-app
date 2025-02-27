import { getEntries } from "@/blog";
import Link from "next/link";

export default async function BlogSidebar() {
  const entries = await getEntries();

  return (
    <aside>
      <h2 className="text-2xl font-bold">All posts</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.title}>
            <Link href={`/blog/${entry.title}`}>{entry.title}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
