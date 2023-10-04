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
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col items-center justify-center"
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
          <input
            id="location"
            name="location"
            type="text"
            className="mb-5 block w-60"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            className="mb-5 block w-60"
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
          <select
            id="breed"
            className="search-input grayed-out-disabled"
            name="breed"
            disabled={breedList.length === 0}
          >
            <option />
            {breedList.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button
          className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500"
        >Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
