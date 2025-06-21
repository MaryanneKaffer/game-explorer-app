import axios from "axios";

export default async function fetchGames(
  page = 1,
  sort = "",
  searchQuery = "",
  genre = "",
  platform = ""
) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const pageSize = 36;

  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: apiKey,
        page: page,
        page_size: pageSize,
        ...(searchQuery ? { search: searchQuery } : { ordering: sort }),
        ...(genre ? { genres: genre } : {}),
        ...(platform ? { platforms: platform } : {}),
      },
    });

    const data = response.data;

    const gamePromises = data.results.map(async (game: any) => {
      try {
        const movieResponse = await axios.get(
          `https://api.rawg.io/api/games/${game.id}/movies`,
          {
            params: { key: apiKey },
          },
        );

        const trailers = movieResponse.data.results;
        const trailerUrl = trailers.length > 0 ? trailers[0].data.max : null;

        return { ...game, trailer_url: trailerUrl };
      } catch (error) {
        return { ...game, trailer_url: null };
      }
    });

    const gamesWithTrailers = await Promise.all(gamePromises);

    return {
      games: gamesWithTrailers,
      nextPage: data.next ? page + 1 : null,
      previousPage: data.previous ? page - 1 : null,
      totalCount: data.count,
    };
  } catch (error) {
    throw new Error("Failed to fetch games");
  }
}