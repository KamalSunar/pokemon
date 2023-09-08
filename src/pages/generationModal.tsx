import React, { useEffect, useState } from "react";
import Modal from "../components/modal";
import { ReactComponent as BackImg } from "../assets/images/arrow-back.svg";
import { EvolvesTo, GenerationListType, PokemonTypes } from "../types";
import { CapitalizeFirstLetter } from "../utils";
import Badge from "../components/badge";
import Tabs from "../components/tabs";
import About from "./modal/about";
import BaseStats from "./modal/baseStats";
import { STATS } from "../constants";
import { API_ENDPOINTS } from "../store/apiEndPoints";
import Axios from "axios";
import Evolution from "./modal/evolution";
import { shallowEqual, useSelector } from "react-redux";
import { RootReducerState } from "../store/rootReducer";

interface GenerationModalType {
  pokemonInfo: PokemonTypes;
  isModalOpen: boolean;
  closeModal: () => void;
  handleLikePokemon: (value: PokemonTypes) => void;
}

const GenerationModal = ({
  pokemonInfo,
  isModalOpen,
  closeModal,
  handleLikePokemon,
}: GenerationModalType) => {
  const [tabIndex, setTabIndex] = useState("About");
  const [pokemonEvoInfo, setPokemonEvoInfo] = useState<GenerationListType[]>(
    []
  );

  useEffect(() => {
    getPokemonDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data } = useSelector(
    ({ pokemonTeamReducer }: RootReducerState) => ({
      data: pokemonTeamReducer.data,
    }),
    shallowEqual
  );

  const { name, sprites, order, types, abilities, height, weight, stats } =
    pokemonInfo;
  const ImageUrl = sprites?.other?.["official-artwork"]?.front_default;
  const Species = types?.map((type) => CapitalizeFirstLetter(type.type.name));
  const isActive = data.some((item) => item.name === name);
  const Abilities = abilities?.map((ab) =>
    CapitalizeFirstLetter(ab.ability.name)
  );
  const baseStats = stats?.map((stat) => {
    const statName = stat.stat.name.toLowerCase() as keyof typeof STATS;
    const name = STATS[statName] || statName;
    return {
      name,
      value: stat.base_stat,
    };
  });

  const ModalTabs = [
    {
      title: "About",
      content: (
        <About
          abilities={Abilities}
          height={height}
          weight={weight}
          species={Species}
        />
      ),
    },
    {
      title: "Base Stats",
      content: <BaseStats baseStats={baseStats} />,
    },
    {
      title: "Evolution",
      content: (
        <Evolution
          evolutionInfo={pokemonEvoInfo}
          ImageUrl={ImageUrl}
          name={name}
        />
      ),
    },
  ];

  const evolutionData = (
    evolve: EvolvesTo[],
    evoList: GenerationListType[]
  ) => {
    evolve.map((evo) => {
      evoList.push(evo.species);

      if (evo.evolves_to.length > 0) {
        evolutionData(evo.evolves_to, evoList);
      }

      return null;
    });
    return null;
  };

  const getPokemonDetails = async () => {
    const res = await Axios.get(
      `${API_ENDPOINTS.GET_POKEMON_SPECIES_DETAILS}/${name}`
    ).then((res) => {
      return res.data;
    });

    Axios.get(`${res.evolution_chain.url}`)
      .then((res) => {
        if (res) {
          const evoList: GenerationListType[] = [];
          const tempPokemonInfo: GenerationListType[] = [];

          evolutionData(res.data.chain.evolves_to, evoList);

          evoList.forEach((item: { name: string; url: string }) => {
            Axios.get(`${API_ENDPOINTS.GET_POKEMON_DETAILS}/${item.name}`)
              .then((res) => {
                if (res) {
                  const { sprites, species } = res.data;
                  const Info = {
                    name: species.name as string,
                    url: sprites?.other?.["official-artwork"]
                      ?.front_default as string,
                  };
                  tempPokemonInfo.push(Info);
                }
              })
              .catch(() => {
                console.log("errors");
              })
              .finally(() => {
                setPokemonEvoInfo(tempPokemonInfo);
              });
          });
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <Modal show={isModalOpen}>
      <div
        className={`modal-header modal-${CapitalizeFirstLetter(
          Species ? Species[0] : "Default"
        )}`}
      >
        <div className="icons">
          <div className="back" onClick={closeModal}>
            <BackImg />
          </div>
          <div
            className={`like like-${isActive ? "active" : ""}`}
            onClick={() => handleLikePokemon(pokemonInfo)}
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
        <div className="modal-header--info">
          <div>
            <h3>{CapitalizeFirstLetter(name)}</h3>
            <div className="flex badges">
              {Species &&
                Species?.map((spec: any) => (
                  <Badge text={spec} variant={spec} key={spec} />
                ))}
            </div>
          </div>
          <h6>#{order}</h6>
        </div>
      </div>
      <div className="modal-body">
        <div className="modal-body--img">
          <img src={ImageUrl} alt={name} />
        </div>
        <div className="modal-body--tab">
          <Tabs
            tabs={ModalTabs}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            hasTitle={false}
          />
        </div>
      </div>
    </Modal>
  );
};

export default GenerationModal;
