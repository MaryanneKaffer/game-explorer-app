'use client';
import { TiArrowSortedDown } from "react-icons/ti";
import { Button } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/react";
import React from "react";
import GameDisplay from "../content/gameDisplay";

export default function Explorer() {
    const [isOpenListbox, setIsOpenListbox] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState("Highest rating");

    const options = ["Highest rating", "Lowest rating", "Newest", "Oldest", "Name", "Highest metascore", "Lowest metascore"];

    const handleButtonPress = () => {
        setIsOpenListbox((prevState) => !prevState);
    };

    const handleSelection = (order: string) => {
        setSelectedOrder(order);
        setIsOpenListbox(false);
    };

    const filteredOptions = options.filter((option) => option !== selectedOrder);

    return (
        <section className="mx-5 relative">
            <h1 className="text-6xl font-bold my-3"> 300+ games </h1>
            <h2 className="text-sm mb-5"> Based on player counts </h2>

            <Button onPress={handleButtonPress} className="relative px-4 py-2 text-white rounded-lg animate-rainbow-glow bg-opacity-25">
                Order by: <span className="font-bold">{selectedOrder}</span> <TiArrowSortedDown />
            </Button>

            {isOpenListbox && (
                <div className="absolute mt-1 z-50 bg-opacity-95 py-3 bg-black shadow-lg rounded-md max-w-56 w-full" >
                    <Listbox aria-label="Actions">
                        {filteredOptions.map((option) => (
                            <ListboxItem className="mt-1 !text-inherit !bg-transparent hover:animate-rainbow-glow hover:rounded-md" key={option} onClick={() => handleSelection(option)}>
                                {option}
                            </ListboxItem>
                        ))}
                    </Listbox>
                </div>
            )}
            {selectedOrder === "Highest rating" && <GameDisplay sortFunction={((a, b) => b.rating - a.rating)} />}
            {selectedOrder === "Lowest rating" && <GameDisplay sortFunction={((a, b) => a.rating - b.rating)} />}
            {selectedOrder === "Name" && <GameDisplay sortFunction={(a, b) => a.name.localeCompare(b.name)} />}
            {selectedOrder === "Newest" && <GameDisplay sortFunction={((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime())} />}
            {selectedOrder === "Oldest" && <GameDisplay sortFunction={((a, b) => new Date(a.released).getTime() - new Date(b.released).getTime())} />}
            {selectedOrder === "Highest metascore" && <GameDisplay sortFunction={((a, b) => b.metacritic - a.metacritic)} />}
            {selectedOrder === "Lowest metascore" && <GameDisplay sortFunction={((a, b) => a.metacritic - b.metacritic)} />}
        </section>
    );
}