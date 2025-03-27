import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "togethercomputer/llama-2-7b-chat",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
