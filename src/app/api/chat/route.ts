import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
});

const model = google("gemini-1.5-pro-latest");

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await streamText({
    model,
    messages,
  });

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response.textStream) {
        controller.enqueue(chunk);
      }
      controller.close();
    },
  });

  // Return a streaming response
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
