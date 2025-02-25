import axios from 'axios';

export default async function fetchAllGames() {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const pageSize = 30;
  let allGames: any[] = [];
  let page = 1;
  const maxPages = 30;
  let hasMore = true;

  while (hasMore && page <= maxPages) {
    try {
      const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: apiKey,
          page: page,
          page_size: pageSize,
        },
      });

      const data = response.data;
      const gamePromises = data.results.map(async (game: any) => {
        try {
          const movieResponse = await axios.get(`https://api.rawg.io/api/games/${game.id}/movies`, {
            params: { key: apiKey },
          });
          
          const trailers = movieResponse.data.results;
          const trailerUrl = trailers.length > 0 ? trailers[0].data.max : null;

          return { ...game, trailer_url: trailerUrl };
        } catch (error) {
          console.warn(`Failed to fetch trailer for game ID: ${game.id}`);
          return { ...game, trailer_url: null };
        }
      });
      console.log("API Key:", process.env.NEXT_PUBLIC_RAWG_API_KEY);

      const gamesWithTrailers = await Promise.all(gamePromises);

      allGames = [...allGames, ...gamesWithTrailers];
      hasMore = data.next !== null;
      page++;
    } catch (error) {
      throw new Error("Failed to fetch games");
    }
  }

  return allGames;
}
