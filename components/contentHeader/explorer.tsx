"use client";
import { TiArrowSortedDown } from "react-icons/ti";
import { Button, Input } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/react";
import React from "react";
import GameDisplay from "../content/gameDisplay";
import { filterOptions } from "@/config/filterOptions";
import { SearchIcon } from "@/assets/serachIcon";
import { motion } from "framer-motion";

export default function Explorer() {
  const [isOpenListbox, setIsOpenListbox] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(filterOptions[0]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleButtonPress = () => {
    setIsOpenListbox((prevState) => !prevState);
  };

  const handleSelection = (order: { label: string; value: string }) => {
    order.label === "Search Query" && setSearchQuery(order.value);
    setSelectedOrder(order);
    setIsOpenListbox(false);
  };

  return (
    <section className="relative">
      <h1 className="text-6xl font-bold mb-3 text-blue-600 drop-shadow-[0_4px_8px_rgba(37,99,235,0.3)]">
        {" "}
        Game Explorer{" "}
      </h1>
      <h2 className="text-sxl mb-5"> Based on rawg.io API </h2>
      <div className="flex gap-5 items-center">
        <Button
          onPress={handleButtonPress}
          className="relative px-6 py-2 text-white radius-lg animate-rainbow-glow bg-opacity-25 flex"
        >
          <span className="sm:flex hidden"> Order by:</span>{" "}
          <span className="font-bold">{selectedOrder.label}</span>{" "}
          <TiArrowSortedDown />
        </Button>
        <Input
          onChange={(e) =>
            handleSelection({ label: "Search Query", value: e.target.value })
          }
          onClear={() => handleSelection(filterOptions[0])}
          classNames={{
            inputWrapper: [
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
              "max-w-xs",
              "animate-rainbow-glow",
            ],
          }}
          placeholder="Type to search..."
          radius="lg"
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      {isOpenListbox && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className={`absolute mt-1 z-50 py-3 bg-black rounded-md w-full origin-top max-w-56`}
        >
          <Listbox aria-label="Actions" selectedKeys={selectedOrder.value}>
            {filterOptions.map((option) => (
              <ListboxItem
                className="mt-1 !text-inherit !bg-transparent hover:animate-rainbow-glow hover:rounded-md"
                key={option.value}
                onPress={() => handleSelection(option)}
              >
                {option.label}
              </ListboxItem>
            ))}
          </Listbox>
        </motion.div>
      )}
      <GameDisplay filter={selectedOrder} searchQuery={searchQuery} />
    </section>
  );
}
