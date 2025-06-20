import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

  try {
    const response = await axios.get("https://api.rawg.io/api/genres", {
      params: {
        key: apiKey,
      },
    });

    const genres = response.data.results;

    return NextResponse.json(genres);
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 });
  }
}
