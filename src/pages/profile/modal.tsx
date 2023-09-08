import React, { useState } from "react";
import Modal from "../../components/modal";
import { ReactComponent as BackImg } from "../../assets/images/arrow-back.svg";
import { PokemonTypes } from "../../types";
import Card from "../../components/card";
import { useDispatch } from "react-redux";
import { getPokemonTeamList } from "../../store/profile/action";
import useBoolean from "../../hooks/useBoolean";
import GenerationModal from "../generationModal";
import InfoModal from "../../components/infoModal";

interface ProfileModalType {
  isModalOpen: boolean;
  closeModal: () => void;
  data: PokemonTypes[];
}

const ProfileModal = ({ data, isModalOpen, closeModal }: ProfileModalType) => {
  const dispatch = useDispatch<any>();
  const [pokemonInfo, setPokemonInfo] = useState({});
  const {
    value: isModalViewOpen,
    setFalse: closeViewModal,
    setTrue: openModal,
  } = useBoolean(false);
  const {
    value: isModalAlertOpen,
    setFalse: closeAlertModal,
    setTrue: openAlertModal,
  } = useBoolean(false);

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

  const handleCardClick = (pokemonInfo: PokemonTypes) => {
    setPokemonInfo(pokemonInfo);
    openModal();
  };

  return (
    <div className="banner-modal">
      <Modal show={isModalOpen} size="lg">
        <div className="modal-header banner-modal">
          <div className="icons">
            <div className="back" onClick={closeModal}>
              <BackImg />
            </div>
          </div>
          <h3>My Team</h3>
          <div />
        </div>
        <div className="modal-body">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {data?.map((card, index) => (
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
        </div>
      </Modal>
      {isModalViewOpen && (
        <GenerationModal
          isModalOpen={isModalViewOpen}
          closeModal={closeViewModal}
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
    </div>
  );
};

export default ProfileModal;
