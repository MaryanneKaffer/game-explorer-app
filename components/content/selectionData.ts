export const selectionData = [
    {
        title: "Highest rating",
        selectSection: "Highest rating",
        description: "Based on player counts",
        sortOrder: (a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating,
    },
    {
        title: "Lowest rating",
        selectSection: "Lowest rating",
        description: "Based on player counts",
        sortOrder: (a: { rating: number; }, b: { rating: number; }) => a.rating - b.rating,
    },
    {
        title: "Most recent",
        selectSection: "Newest",
        description: "Based on release date",
        sortOrder: (a: { released: string | number | Date; }, b: { released: string | number | Date; }) => new Date(b.released).getTime() - new Date(a.released).getTime(),
    },
    {
        title: "Oldest",
        selectSection: "Oldest",
        description: "Based on release date",
        sortOrder: (a: { released: string | number | Date; }, b: { released: string | number | Date; }) => new Date(a.released).getTime() - new Date(b.released).getTime(),
    },
    {
        title: "Best metascore",
        selectSection: "Highest metascore",
        description: "Based on metacritic",
        sortOrder: (a: { metacritic: any; }, b: { metacritic: any; }) => (b.metacritic) - (a.metacritic),
    },
    {
        title: "Worst metascore",
        selectSection: "Lowest metascore",
        description: "Based on metacritic",
        sortOrder: (a: { metacritic: any; }, b: { metacritic: any; }) => (a.metacritic || Infinity) - (b.metacritic || Infinity),
    },
    {
        title: "Sort by name",
        selectSection: "Name",
        description: "Alphabetic order",
        sortOrder: (a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name),
    }
]