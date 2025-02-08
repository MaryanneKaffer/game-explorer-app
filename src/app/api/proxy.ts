async function fetchGameData(slug: string) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=${apiKey}`);
  if (!response.ok) {
    throw new Error("Failed to fetch game data");
  }
  return response.json();
}
