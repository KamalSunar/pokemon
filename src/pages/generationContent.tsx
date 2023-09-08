import React, { useEffect, useState } from "react";
import Card from "../components/card";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "../store/rootReducer";
import { getGenerationPokemonList } from "../store/generationById/action";
import { convertRomanToNumber } from "../utils";
import Loader from "../components/loader";
import { PokemonTypes } from "../types";
import useBoolean from "../hooks/useBoolean";
import GenerationModal from "./generationModal";
import { getPokemonTeamList } from "../store/profile/action";
import InfoModal from "../components/infoModal";

interface GenerationContentType {
  tabIndex: string;
}

const GenerationContent = ({ tabIndex }: GenerationContentType) => {
  const dispatch = useDispatch<any>();
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [showMore, setShowMore] = useState(10);
  const {
    value: isModalOpen,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean(false);
  const {
    value: isModalAlertOpen,
    setFalse: closeAlertModal,
    setTrue: openAlertModal,
  } = useBoolean(false);

  useEffect(() => {
    dispatch(getGenerationPokemonList(convertRomanToNumber(tabIndex)));
  }, [tabIndex, dispatch]);

  const { loading, pokemonList, data } = useSelector(
    ({ generationByIdReducer, pokemonTeamReducer }: RootReducerState) => ({
      loading: generationByIdReducer.loading,
      pokemonList: generationByIdReducer.data,
      data: pokemonTeamReducer.data,
    }),
    shallowEqual
  );

  const handleCardClick = (pokemonInfo: PokemonTypes) => {
    setPokemonInfo(pokemonInfo);
    openModal();
  };

  const handleLikePokemon = (pokeInfo: PokemonTypes) => {
    let newPokemonList: PokemonTypes[] = [...data];
    let hasData = newPokemonList.some((item) => item.name === pokeInfo.name);
    if (hasData) {
      let filterData = newPokemonList.filter(
        (item) => item.name !== pokeInfo.name
      );
      newPokemonList = filterData;
    } else {
      if (data.length === 6) {
        openAlertModal();
        return null;
      }
      newPokemonList.push(pokeInfo);
    }

    dispatch(getPokemonTeamList(newPokemonList));
  };

  return (
    <>
      {loading && <Loader size="lg" />}
      {!loading && (
        <div className="mb-10">
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-10">
            {pokemonList?.slice(0, showMore).map((card, index) => (
              <Card
                key={index}
                specName={card.name}
                handleCardClick={(pokemonInfo) => handleCardClick(pokemonInfo)}
                handleLikePokemon={(pokemonInfo) =>
                  handleLikePokemon(pokemonInfo)
                }
              />
            ))}
          </div>
          <div className="text-center">
            {pokemonList.length > showMore && (
              <button
                className="button button-primary"
                onClick={() => {
                  setShowMore(showMore + 10);
                }}
              >
                Show More
              </button>
            )}
          </div>
        </div>
      )}
      {isModalOpen && (
        <GenerationModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          pokemonInfo={pokemonInfo as PokemonTypes}
          handleLikePokemon={(pokemonInfo) => handleLikePokemon(pokemonInfo)}
        />
      )}
      {isModalAlertOpen && (
        <InfoModal
          isModalOpen={isModalAlertOpen}
          closeModal={closeAlertModal}
        />
      )}
    </>
  );
};

export default GenerationContent;
