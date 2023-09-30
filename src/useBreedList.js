import { useEffect, useState } from "react";

const localCache = new Map();

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache.has(animal)) {
      return localCache.get(animal);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
      );
      const json = await res.json();
      localCache.set(animal, json.breeds);
      setBreedList(json.breeds);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
