import { Input } from "@heroui/react";
import { SearchIcon } from "@/assets/serachIcon";

export default function SearchInput() {
    return (
        <>
            <Input
                isClearable
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
        </>
    );
}
