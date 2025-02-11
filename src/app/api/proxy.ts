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
      allGames = [...allGames, ...data.results];
      hasMore = data.next !== null;
      page++;
    } catch (error) {
      throw new Error("Failed to fetch games");
    }
  }

  return allGames;
}
