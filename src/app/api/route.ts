import fetchGames from "@/src/app/api/proxy";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || '';
  const searchQuery = searchParams.get('search') || '';

  try {
    const data = await fetchGames(page, sort, searchQuery);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch games' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
