import { Card, CardHeader, CardBody } from "@heroui/card";
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
  platforms: {
    platform: {
      name: string;
      slug: string;
    };
  }[];
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
    <div className="relative lgxl:h-[365px] md:h-[300px] lgxl:w-[330px] xl:w-[230px] md:w-[220px] w-full h-[360px]">
      <Card
        className="w-full z-0 p-3 hover:z-10 transform transition-transform duration-300 hover:scale-105 group h-full hover:h-fit absolute"
        onMouseEnter={() => setShowTrailer(true)}
        onMouseLeave={() => setShowTrailer(false)}
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
              alt={game.name}
              src={game.background_image}
              className="w-full lgxl:max-h-40 md:max-h-24 max-h-44 object-cover rounded-md"
            />
          )}
        </CardHeader>
        <CardBody className="overflow-hidden">
          <h1 className="lgxl:text-xl lg:text-lg font-bold">{game.name}</h1>
          <span className="flex flex-col gap-2">
            <p className={`text-sm mt-2 ${ratingColor}`}>
              <span className="text-white">Rating:</span> {game.rating}
            </p>
            {game.metacritic && (
              <p className={`text-sm ${metacriticColor}`}>
                <span className="text-white">Metacritic:</span> {game.metacritic}
              </p>
            )}
            <p className="text-sm">
              Genres: {game.genres.map((genre) => genre.name).join(", ")}
            </p>
            <span className="trnasition-all duration-300 opacity-0 group-hover:opacity-100 flex flex-col gap-2">
              <p className="text-sm">Released: {game.released}</p>
              <p className="text-sm">
                Platforms: {game.platforms.map((p) => p.platform.name).join(", ")}
              </p>
            </span>
          </span>
        </CardBody>
      </Card>
    </div>
  );
}