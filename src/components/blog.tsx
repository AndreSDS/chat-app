import { BlogEntry } from "@/types";

export const Blog = ({ entries }: { entries: BlogEntry[] }) => {
  return (
    <>
      {entries.map((entry) => (
        <article key={entry.title}>
          <h1 className="font-bold text-2xl mb-2">{entry.title}</h1>
          <p className="mb-2 font-light">{entry.text}</p>
        </article>
      ))}
    </>
  );
};
