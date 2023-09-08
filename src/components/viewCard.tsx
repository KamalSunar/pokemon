import React from "react";
import Badge from "./badge";
import DefaultImage from "../assets/images/pokeball.png";
import { CapitalizeFirstLetter } from "../utils";
import { PokemonTypes } from "../types";

interface ViewCardType {
  pokemonInfo: PokemonTypes;
  isActive: boolean;
  handleCardClick: (value: PokemonTypes) => void;
  handleLikePokemon: (value: PokemonTypes) => void;
}

const ViewCard = ({
  pokemonInfo,
  isActive,
  handleCardClick,
  handleLikePokemon,
}: ViewCardType) => {
  const { name, sprites, order, types } = pokemonInfo as PokemonTypes;
  const ImageUrl = sprites?.other?.["official-artwork"]?.front_default;
  const Species = types?.map((type) => type.type.name);
  //   const isActive = data.some((item) => item.name === name);

  return (
    <div className={`card card-${CapitalizeFirstLetter(Species[0])}`}>
      <div className="card-img">
        <img src={ImageUrl || DefaultImage} alt={name} />
      </div>
      {name && (
        <div className="card-action">
          <div
            className={`card-action--like card-${isActive ? "active" : ""}`}
            onClick={() => {
              handleLikePokemon(pokemonInfo);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="#fff"
              role="img"
              className="icon fill-current shot-tools-icon"
            >
              <path
                d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                stroke="#6d6a6a"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="transparent"
              ></path>
            </svg>
          </div>
        </div>
      )}
      <div className="card-body">
        {order ? <h6>#{order}</h6> : ""}
        <h3>{CapitalizeFirstLetter(name)}</h3>
        <div className="card-body--spec mb-5">
          {Species.map((spec: any) => (
            <Badge text={spec} variant={spec} key={spec} />
          ))}
        </div>
        {name && (
          <div
            className="button button-view"
            onClick={() => handleCardClick(pokemonInfo)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              role="img"
              className="icon fill-current shot-tools-icon"
            >
              <path
                d="M8 3C4.36992 3 1.98789 6.21774 1.18763 7.49059C1.09079 7.64462 1.04237 7.72163 1.01527 7.84042C0.99491 7.92964 0.99491 8.07036 1.01527 8.15958C1.04237 8.27837 1.09079 8.35539 1.18763 8.50941C1.98789 9.78226 4.36992 13 8 13C11.6301 13 14.0121 9.78226 14.8124 8.50941L14.8124 8.50939C14.9092 8.35538 14.9576 8.27837 14.9847 8.15958C15.0051 8.07036 15.0051 7.92964 14.9847 7.84042C14.9576 7.72163 14.9092 7.64462 14.8124 7.4906L14.8124 7.49059C14.0121 6.21774 11.6301 3 8 3Z"
                fill="currentColor"
              ></path>
              <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                fill="white"
              ></path>
            </svg>
            View
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCard;
