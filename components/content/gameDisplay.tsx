"use client";

import { Button, Pagination } from "@heroui/react";
import React, { useEffect } from "react";
import GameCard from "./gameCard";

export default function GameDisplay({
  filter,
  searchQuery,
  genre,
  platform,
}: {
  filter: string;
  searchQuery: string;
  genre: string;
  platform: string;
}) {
  const [games, setGames] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);

  useEffect(() => {
    setPage(1);
  }, [filter, searchQuery, genre, platform]);

  const pageSize = 20;
  const maxPages = 500;

  React.useEffect(() => {
    async function loadGames() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/games?page=${page}&sort=${filter}&search=${searchQuery}&genres=${genre}&platform=${platform}`,
        );
        const data = await response.json();
        setGames(data.games);
        setTotalCount(data.totalCount);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } loadGames();
  }, [page, filter, searchQuery, genre, platform]);

  const totalPages = Math.min(Math.ceil(totalCount / pageSize), maxPages);

  return (
    <section className="flex flex-col gap-6">
      {loading ? (
        <div>
          <Button size="lg" isLoading className="bg-transparent fixed top-[50%] sm:left-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"/>
        </div>
      ) : (
        <>
          <GameCard games={games} />
          <div className="flex justify-center">
            <Pagination
              className="my-auto"
              showControls
              page={page}
              total={totalPages}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        </>
      )}
    </section>
  );
}
