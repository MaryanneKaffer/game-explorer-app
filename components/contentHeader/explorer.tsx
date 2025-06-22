"use client";
import { TiArrowSortedDown } from "react-icons/ti";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import React from "react";
import GameDisplay from "../content/gameDisplay";
import { SearchIcon } from "@/assets/serachIcon";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { tags } from "@/config/filterOptions";
import { useGenres } from "@/config/useGenres";
import { usePlatforms } from "@/config/usePlatforms";

export default function Explorer() {
  const genres = useGenres();
  const platforms = usePlatforms();

  const genreOptions = genres.map((genre) => ({ label: genre.name, value: genre.id }));
  const platformOptions = platforms.map((platform) => ({ label: platform.name, value: platform.id }));

  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = React.useState("");
  const [selectedGenre, setSelectedGenre] = React.useState("");
  const [selectedPlatform, setSelectedPlatform] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelection = (order: { label: string; value: string }, type: string) => {
    order.label === "Search Query" && setSearchQuery(order.value);
    if (order.value === selectedGenre || order.value === selectedPlatform || order.value === selectedOrder) {
      order.value === selectedGenre ? setSelectedGenre("") :
        order.value === selectedPlatform ? setSelectedPlatform("") :
          order.value === selectedOrder && setSelectedOrder("")
    } else {
      type === 'Genres' ? setSelectedGenre(order.value) : type === 'Platforms' ? setSelectedPlatform(order.value) : setSelectedOrder(order.value);
    }
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
        </div>

        <div className="w-full">
          <div className="flex w-full gap-2">
            <Button
              size="lg"
              onPress={onOpenChange}
              className="relative px-6 py-2 text-white radius-lg animate-rainbow-glow bg-opacity-25 flex sm:hidden"
            >
              <p> Filters </p>
            </Button>
            <Input
              onBlur={(e) => handleSelection({ label: "Search Query", value: e.target.value }, "Search Query")}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSelection({ label: "Search Query", value: e.currentTarget.value }, "Search Query")
                }
              }}
              onClear={() => { setSearchQuery("") }}
              size="lg"
              className="w-full"
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
          </div>
          
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='bottom-center' className="bg-[#18181B]/90">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col">Filters</ModalHeader>
                  <ModalBody className="overflow-y-auto max-h-[calc(100vh-150px)]">
                    {filterOptions.map((option) => (
                      <>
                        <h1 className="text-xl text-blue-500">{option.name}</h1>
                        {option.value.map((item) => (
                          <button
                            key={item.value}
                            onClick={() => { handleSelection(item, option.name); }}
                            className={`w-full -m-1 text-lg text-left hover:brightness-50 px-5 py-2 bg-[#18181B]/70 transition-all duration-300 rounded-md flex
                    ${(item.value === selectedOrder || item.value === selectedGenre || selectedPlatform === item.value) && "brightness-125"}`}
                          >
                            {item.label}
                            {(item.value === selectedOrder || item.value === selectedGenre || selectedPlatform === item.value) && (
                              <FaCheck className="ml-auto my-auto size-5" />
                            )}
                          </button>
                        ))}
                      </>
                    ))}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
          <GameDisplay filter={selectedOrder} searchQuery={searchQuery} genre={selectedGenre} platform={selectedPlatform} />
        </div>
      </div>
    </section>
  );
}