'use client'

import { Button } from "@heroui/react";
import GameCard from "./gameCard";
import React from "react";
import fetchAllGames from "@/src/app/api/proxy";

interface GameDisplayProps {
    sortFunction: (a: any, b: any) => number;
}


export default function GameDisplay({ sortFunction }: GameDisplayProps) {
    const [allGames, setAllGames] = React.useState<any[]>([]);
    const [visibleGames, setVisibleGames] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);

    const pageSize = 12

    React.useEffect(() => {

        async function loadAllGames() {
            setLoading(true);
            try {
                const games = await fetchAllGames();
                const sortedGames = games.sort(sortFunction);
                setAllGames(sortedGames);
                setVisibleGames(sortedGames.slice(0, pageSize));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadAllGames();
    }, []);

    React.useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                !loading
            ) {
                loadMoreGames();
            }
        }

        function loadMoreGames() {
            setLoading(true);
            setPage((prevPage) => {
                const nextPage = prevPage + 1;
                const startIndex = prevPage * pageSize;
                const endIndex = nextPage * pageSize;

                const newGames = allGames.slice(startIndex, endIndex);
                setVisibleGames((prevVisibleGames) => {
                    const uniqueGames = newGames.filter(
                        (game) => !prevVisibleGames.some((g) => g.id === game.id)
                    );
                    return [...prevVisibleGames, ...uniqueGames];
                });

                setLoading(false);
                return nextPage;
            });
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allGames, loading]);

    return (
        <section className="mx-5">
            <GameCard games={visibleGames} />
            {loading && (
                <p className="text-center mx-10 bg-transparent">
                    <Button isLoading variant="flat">Loading</Button>
                </p>
            )}
        </section>

    );
}