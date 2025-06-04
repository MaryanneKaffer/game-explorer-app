import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { useState } from "react";

interface Game {
  id: number;
  name: string;
  released: string;
  rating: number;
  background_image: string;
  genres: { name: string }[];
  trailer_url?: string;
  metacritic: string;
}

export default function GameCard({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
      {games.map((game) => (
        <GameCardItem key={game.id} game={game} />
      ))}
    </div>
  );
}

function GameCardItem({ game }: { game: Game }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const ratingColor =
    game.rating >= 4
      ? "text-green-500"
      : game.rating >= 2
        ? "text-yellow-500"
        : "text-red-500";
  const metacriticColor =
    Number(game.metacritic) >= 70
      ? "text-green-500"
      : Number(game.metacritic) >= 40
        ? "text-yellow-500"
        : "text-red-500";
  return (
    <Card
      onMouseEnter={() => setShowTrailer(true)}
      onMouseLeave={() => setShowTrailer(false)}
      className="max-w-[400px] p-3 transform transition-transform duration-300 hover:scale-105"
    >
      <CardHeader className="flex justify-center">
        {showTrailer && game.trailer_url ? (
          <video
            src={game.trailer_url}
            className="w-full h-56 object-cover rounded-md"
            autoPlay
            muted
            loop
          />
        ) : (
          <Image
            src={game.background_image}
            alt={game.name}
            className="lg:w-full lg:h-56 object-cover rounded-md"
          />
        )}
      </CardHeader>
      <CardBody>
        <h3 className="text-xl font-bold">{game.name}</h3>
        <p className="text-sm mt-2">Released: {game.released}</p>
        <p className={`text-sm mt-2 ${ratingColor}`}>
          <span className="text-white">Rating:</span> {game.rating}
        </p>
        {game.metacritic && (
          <p className={`text-sm mt-2 ${metacriticColor}`}>
            <span className="text-white">Metacritic:</span> {game.metacritic}
          </p>
        )}
      </CardBody>
      <CardFooter>
        <p className="text-sm">
          Genres: {game.genres.map((genre) => genre.name).join(", ")}
        </p>
      </CardFooter>
    </Card>
  );
}
