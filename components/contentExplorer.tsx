"use client";
import * as React from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/react";
import { Image } from "@heroui/image";

export default function ContentExplorer() {
  const [games, setGames] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getRandomGames() {
      try {
        const data = await fetchGames();
        const randomGames = data.results.sort(() => 1.2 - Math.random()).slice(0, 12);
        setGames(randomGames);
      } catch (error) {
        console.error(error);
      }
    }
    getRandomGames();
  }, []);
  
  function Score({ rating }: { rating: number }) {
    if (rating > 4) {
      return <span className="text-green-500">{rating}</span>;
    } else if (rating < 3) {
      return <span className="text-red-500">{rating}</span>;
    } else {
      return <span className="text-yellow-500">{rating}</span>;
    }
  }

  return (
    <section className="mx-5">
      <h1 className="text-6xl font-bold mb-3"> New and trending </h1>
      <h2 className="text-sm mb-5"> Based on player counts and release date </h2>
      <Button className=""> Order by: <span className="font-bold"> Relevance </span> <TiArrowSortedDown /></Button>

      <div className="grid grid-cols-4 gap-5 mt-5">
        {games.map((game) => (
          <Card key={game.id} className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <Image
                src={game.background_image}
                alt={game.name}
                className="w-full h-56 object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="flex gap-2 mb-3">
                {game.platforms?.map((platform: any) => (
                  <span key={platform.platform.id} className="px-1 py-1 rounded text-[10px]">
                    {platform.platform.name}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold">{game.name}</h3>
              <p className="text-sm mt-2">Released: {game.released}</p>
              <p className="text-sm mt-2">Rating: <Score rating={game.rating} /></p>
            </CardBody>
            <CardFooter>
              <p className="text-sm">Genres: {game.genres.map((genre: any) => genre.name).join(", ")}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

async function fetchGames() {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}
