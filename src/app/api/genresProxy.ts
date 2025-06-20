import axios from "axios";

export default async function fetchGenres() {
    const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

    try {
        const response = await axios.get("https://api.rawg.io/api/genres", {
            params: {
                key: apiKey,
            },
        });

        return response.data.results; 
    } catch (error) {
        throw new Error("Failed to fetch genres");
    }
}
