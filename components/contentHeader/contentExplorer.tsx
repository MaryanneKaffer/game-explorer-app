"use client";
import * as React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { Button } from "@heroui/react";
import GameCard from "../content/gameCard";
import FetchGame from "../../src/app/api/proxy";
export default function ContentExplorer() {
  const [games, setGames] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getTopRatedGames() {
      try {
        const data = await FetchGame();
        const sortedGames = data.results
          .sort((a: any, b: any) => b.rating - a.rating)
          .slice(0, 12);
        setGames(sortedGames);
      } catch (error) {
        console.error(error);
      }
    }
    getTopRatedGames();
  }, []);

  return (
    <section className="mx-5">
      <h1 className="text-6xl font-bold my-3"> Best of All Time </h1>
      <h2 className="text-sm mb-5"> Based on player counts </h2>
      <Button className="px-4 py-2 text-white rounded-lg animate-rainbow-glow bg-opacity-25">
        Order by: <span className="font-bold">Relevance</span> <TiArrowSortedDown />
      </Button>

      <GameCard games={games} />

    </section>
  );
}


