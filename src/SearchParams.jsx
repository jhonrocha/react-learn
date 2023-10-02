import React, { useContext, useState } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
const ANIMALS = ["bird", "dog", "cat", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [searchParams, setSearchParams] = useState({
    animal: "",
    location: "",
    breed: "",
  });
  const [breedList] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const res = useQuery(["searchParams", searchParams], fetchSearch);
  const pets = res?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("SUBMITTED");
          const formData = new FormData(e.target);
          const search = {
            animal: formData.get("animal") || "",
            location: formData.get("location") || "",
            breed: formData.get("breed") || "",
          };
          setSearchParams(search);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={breedList.length === 0}>
            <option />
            {breedList.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
