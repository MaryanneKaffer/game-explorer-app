"use client";
import { TiArrowSortedDown } from "react-icons/ti";
import { Button, Input } from "@heroui/react";
import { Listbox, ListboxItem } from "@heroui/react";
import React from "react";
import GameDisplay from "../content/gameDisplay";
import { SearchIcon } from "@/assets/serachIcon";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { tags } from "@/config/filterOptions";
import { useGenres } from "@/config/useGenres";
import { usePlatforms } from "@/config/usePlatforms";

export default function Explorer() {
  const isClient = typeof window !== "undefined";
  const genres = isClient ? useGenres() : [];
  const platforms = isClient ? usePlatforms() : [];

  const genreOptions = genres.map((genre) => ({ label: genre.name, value: genre.id }));
  const platformOptions = platforms.map((platform) => ({ label: platform.name, value: platform.id }));

  const [isOpenListbox, setIsOpenListbox] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState("");
  const [selectedGenre, setSelectedGenre] = React.useState("");
  const [selectedPlatform, setSelectedPlatform] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleButtonPress = () => {
    setIsOpenListbox((prevState) => !prevState);
  };

  const handleSelection = (order: { label: string; value: string }, type: string) => {
    order.label === "Search Query" && setSearchQuery(order.value);
    if (order.value === selectedGenre || order.value === selectedPlatform || order.value === selectedOrder) {
      order.value === selectedGenre ? setSelectedGenre("") :
        order.value === selectedPlatform ? setSelectedPlatform("") :
          order.value === selectedOrder && setSelectedOrder("")
    } else {
      type === 'Genres' ? setSelectedGenre(order.value) : type === 'Platforms' ? setSelectedPlatform(order.value) : setSelectedOrder(order.value);
    }
    setIsOpenListbox(false);
  };
  const filterOptions = [{ name: 'Ordering', value: tags }, { name: 'Genres', value: genreOptions }, { name: 'Platforms', value: platformOptions }];

  return (
    <section className="relative xl:px-[100px] sm:px-[60px] px-[50px] py-[60px]">
      <h1 className="text-6xl font-bold mb-3 text-blue-600 drop-shadow-[0_4px_8px_rgba(37,99,235,0.3)]">
        Game Explorer
      </h1>
      <h2 className="text-sxl mb-5"> Based on rawg.io API </h2>
      <div className="sm:flex sm:flex-row flex-col gap-5">
        <div className="flex flex-col gap-5">
          {filterOptions.map((option) => (
            <div key={option.name} className="sm:flex flex-col hidden lgxl:w-[300px] xl:w-[250px] w-[180px] rounded-xl bg-[#18181B] xl:p-3 p-1 h-fit">
              <h1 className="m-2 xl:text-xl text-md">{option.name}</h1>
              {option.value.map((item) => (
                <button
                  key={item.value}
                  onClick={() => { handleSelection(item, option.name); }}
                  className={`w-full sm:w-auto xl:text-lg text-[13px] items-center text-left hover:brightness-50 px-5 py-2 bg-[#18181B] transition-all duration-300 rounded-md flex 
                    ${(item.value === selectedOrder || item.value === selectedGenre || selectedPlatform === item.value) && "brightness-125"}`}
                >
                  {item.label}
                  {(item.value === selectedOrder || item.value === selectedGenre || selectedPlatform === item.value) && (
                    <FaCheck className="ml-auto xl:size-5 size-3" />
                  )}
                </button>
              ))}
            </div>
          ))}

          <Button
            size="lg"
            onPress={handleButtonPress}
            className="relative px-6 py-2 text-white radius-lg animate-rainbow-glow bg-opacity-25 flex mb-5 sm:hidden"
          >
            <span className="sm:flex hidden"> Order by:</span>{" "}
            <span className="font-bold">{selectedOrder}</span>{" "}
            <TiArrowSortedDown />
          </Button>
        </div>

        <div className="w-full">
          <Input
            onChange={(e) => handleSelection({ label: "Search Query", value: e.target.value }, "Search Query")}
            onClear={() => handleSelection({ label: "Search Query", value: "" }, "Search Query")}
            size="lg"
            className="w-full sm:w-auto"
            classNames={{
              inputWrapper: [
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            radius="lg"
            startContent={<SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
          />
          {isOpenListbox && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className={`absolute -mt-16 z-50 py-3 bg-black rounded-md w-full origin-top max-w-[77dvw] bg-[#0E0E10]`}
            >
              {<Listbox aria-label="Actions" selectedKeys={selectedOrder}>
                {tags.map((option) => (
                  <ListboxItem
                    className="mt-1 !text-inherit !bg-transparent hover:animate-rainbow-glow hover:rounded-md"
                    key={option.label}
                    onPress={() => handleSelection(option, "Ordering")}
                  >
                    {option.label}
                  </ListboxItem>
                ))}
              </Listbox>}
            </motion.div>
          )}

          <GameDisplay filter={selectedOrder} searchQuery={searchQuery} genre={selectedGenre} platform={selectedPlatform} />
        </div>
      </div>
    </section>
  );
}