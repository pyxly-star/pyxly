import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    if (!result.data || !result.data[0]?.b64_json) {
      return NextResponse.json(
        { error: "No image returned" },
        { status: 500 }
      );
    }

    const imageBase64 = result.data[0].b64_json;

    return NextResponse.json({
      image: `data:image/png;base64,${imageBase64}`,
    });

  } catch (error: any) {
    console.error("IMAGE ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

