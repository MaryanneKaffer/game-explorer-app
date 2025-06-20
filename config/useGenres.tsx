import { useEffect, useState } from "react";

export function useGenres() {
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    async function loadGenres() {
      const res = await fetch("/api/genres");
      const data = await res.json();
      setGenres(data);
    }

    loadGenres();
  }, []);

  return genres;
}
