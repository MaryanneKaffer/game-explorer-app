'use client';
import { TiArrowSortedDown } from "react-icons/ti";
import { Button } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/react";
import React from "react";
import GameDisplay from "../content/gameDisplay";
import SearchIcon from "./searchInput";
import { selectionData } from "../content/selectionData";
export default function Explorer() {
    const [isOpenListbox, setIsOpenListbox] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState("Highest rating");
    const [title, setTitle] = React.useState("300+ games");
    const [titleDescription, setTitleDescription] = React.useState("Based on player counts");
    const options = ["Highest rating", "Lowest rating", "Newest", "Oldest", "Name", "Highest metascore", "Lowest metascore"];

    const handleButtonPress = () => {
        setIsOpenListbox((prevState) => !prevState);
    };

    const handleSelection = (order: string) => {
        setSelectedOrder(order);
        setIsOpenListbox(false);
        const selectedData = selectionData.find(item => item.selectSection === order);
        if (selectedData) {
            setTitle(selectedData.title);
            setTitleDescription(selectedData.description);
        }
    };

    const filteredOptions = options.filter((option) => option !== selectedOrder);

    return (
        <section className="mx-5 relative">
            <h1 className="text-6xl font-bold my-3"> {title} </h1>
            <h2 className="text-sm mb-5"> {titleDescription} </h2>
            <div className="flex gap-5 items-center">
                <Button onPress={handleButtonPress} className="relative px-6 py-2 text-white radius-lg animate-rainbow-glow bg-opacity-25 flex">
                    Order by: <span className="font-bold">{selectedOrder}</span> <TiArrowSortedDown />
                </Button>
                <SearchIcon />
            </div>
            {
                isOpenListbox && (
                    <div className="absolute mt-1 z-50 bg-opacity-95 py-3 bg-black shadow-lg rounded-md max-w-56 w-full" >
                        <Listbox aria-label="Actions">
                            {filteredOptions.map((option) => (
                                <ListboxItem className="mt-1 !text-inherit !bg-transparent hover:animate-rainbow-glow hover:rounded-md" key={option} onClick={() => handleSelection(option)}>
                                    {option}
                                </ListboxItem>
                            ))}
                        </Listbox>
                    </div>
                )
            }
            {selectionData.map((item) => (
                selectedOrder === item.selectSection && <GameDisplay sortFunction={item.sortOrder} />
            ))}
        </section >
    );
}