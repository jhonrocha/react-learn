import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const result = useQuery(["pet_details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
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
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city} - ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt me</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}</h1>
              <div className="buttons">
                <button onClick={() => console.log("Yes")}>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default function DetailsErrosBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
