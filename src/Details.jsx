import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import fetchPet from "./fetchPet";

export default function Details() {
  const { id } = useParams();
  const result = useQuery(["pet_details", id], fetchPet);
  if (result.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  const pet = result.data.pets[0];

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city} - ${pet.state}`}</h2>
        <button>Adopt me</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
}
