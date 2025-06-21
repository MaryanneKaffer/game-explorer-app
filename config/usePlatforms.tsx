import { useEffect, useState } from "react";

export function usePlatforms() {
  const [platforms, setPlatforms] = useState<any[]>([]);

  useEffect(() => {
    async function loadPlatforms() {
      const res = await fetch("/api/platforms");
      const data = await res.json();
      setPlatforms(data);
    }

    loadPlatforms();
  }, []);

  return platforms;
}
