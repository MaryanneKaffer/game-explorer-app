import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";

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

function Score({ rating }: { rating: number }) {
  if (rating > 4) {
    return <span className="text-green-500">{rating}</span>;
  } else if (rating < 3) {
    return <span className="text-red-500">{rating}</span>;
  } else {
    return <span className="text-yellow-500">{rating}</span>;
  }
}

export default function GameCard({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-4 gap-5 mt-5">
      {games.map((game) => (
        <div key={game.id}>
          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <Image
                src={game.background_image}
                alt={game.name}
                className="w-full h-56 object-cover"
              />
            </CardHeader>
            <CardBody>
              <h3 className="text-xl font-bold">{game.name}</h3>
              <p className="text-sm mt-2">Released: {game.released}</p>
              <p className="text-sm mt-2">Rating: <Score rating={game.rating} /></p>
              {game.metacritic && (
                <p className="text-sm mt-2">Metacritic: {game.metacritic}</p>
              )}
            </CardBody>
            <CardFooter>
              <p className="text-sm">
                Genres: {game.genres.map((genre: any) => genre.name).join(", ")}
              </p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
