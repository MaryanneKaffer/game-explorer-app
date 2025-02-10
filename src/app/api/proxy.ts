export default async function fetchGames(page: number) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const pageSize = 12; 
  
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}
