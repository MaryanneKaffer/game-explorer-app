"use client";

import { Button, Pagination } from "@heroui/react";
import GameCard from "./gameCard";
import React, { useEffect } from "react";

export default function GameDisplay({
  filter,
  searchQuery,
  genre,
}: {
  filter: { label: string; value: string };
  searchQuery: string;
  genre: string;
}) {
  const [genreSort, setGenreSort] = React.useState("");
  const [games, setGames] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  const [sort, setSort] = React.useState(filter.value);

  useEffect(() => {
    setSort(filter.value);
    setPage(1);
  }, [filter, searchQuery, genre]);

  const pageSize = 20;
  const maxPages = 500;

  React.useEffect(() => {
    async function loadGames() {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/games?page=${page}&sort=${sort}&search=${searchQuery}&genres=${genre}`
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
  }, [page, sort, searchQuery, genre]);

  const totalPages = Math.min(Math.ceil(totalCount / pageSize), maxPages);

  return (
    <section className="flex flex-col gap-6">
      {loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button size="lg" isLoading className="bg-transparent" />
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
