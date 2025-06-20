import { NextRequest, NextResponse } from "next/server";
import fetchGames from "@/src/app/api/proxy";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const sort = searchParams.get('sort') || '';
    const searchQuery = searchParams.get('search') || '';
    const genres = searchParams.get('genres') ?? '';

    try {
        const data = await fetchGames(page, sort, searchQuery, genres);
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to fetch games' },
            { status: 500 }
        );
    }
}
