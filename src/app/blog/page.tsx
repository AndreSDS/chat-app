import { getEntries } from "@/blog";
import { Blog } from "@/components/blog";
import { BlogForm } from "@/components/blog-form";
import { type BlogEntry } from "@/types";

export default async function BlogPage() {
  const entries: BlogEntry[] = await getEntries();

  return (
    <main className="flex p-4">
      <div className="w-1/2">
        <Blog entries={entries} />
      </div>
      <div className="w-1/2">
        <BlogForm />
      </div>
    </main>
  );
}
