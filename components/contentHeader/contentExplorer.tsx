"use client";
import * as React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { Button } from "@heroui/react";
import GameCard from "../content/gameCard";
import FetchGame from "../../src/app/api/proxy";

export default function ContentExplorer() {
  const [games, setGames] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function loadGames() {
      setLoading(true);
      try {
        const data = await FetchGame(page);
        const newGames = data.results.slice(0, 12);
        setGames((prevGames) => [
          ...prevGames,
          ...newGames.filter((game: { id: any }) => !prevGames.some((g) => g.id === game.id)),
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadGames();
  }, [page]);

  React.useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const sortedGames = React.useMemo(() => {
    return [...games].sort((a, b) => b.rating - a.rating);
  }, [games]);

  return (
    <section className="mx-5">
      <h1 className="text-6xl font-bold my-3"> Best of All Time </h1>
      <h2 className="text-sm mb-5"> Based on player counts </h2>
      <Button className="px-4 py-2 text-white rounded-lg animate-rainbow-glow bg-opacity-25">
        Order by: <span className="font-bold">Rating</span> <TiArrowSortedDown />
      </Button>

      <GameCard games={sortedGames} />
      {loading && (
        <p className="text-center mx-10 bg-transparent">
          <Button isLoading variant="flat">Loading</Button>
        </p>
      )}
    </section>
  );
}
