"use server"

import { revalidatePath } from "next/cache"
import { BlogEntry } from "./types"

const entries: BlogEntry[] = [
    {
        title: "Hello, world!",
        text: "This is the first blog entry."
    },
    {
        title: "Goodbye, world!",
        text: "This is the last blog entry."
    }
]

export async function getEntries(): Promise<BlogEntry[]> {
    return entries
}

export async function addEntry(entry: BlogEntry): Promise<void> {
    entries.push(entry)
    revalidatePath("/blog")
}