import { combineReducers } from "redux";

import { generationReducer } from "./generations/reducer";
import { generationByIdReducer } from "./generationById/reducer";
import { pokemonTeamReducer } from "./profile/reducer";
import { DefaultReducerObjectType, PokemonDetailsReducerObjectType } from "../types";

export type RootReducerState = {
  generationReducer: DefaultReducerObjectType;
  generationByIdReducer: DefaultReducerObjectType;
  pokemonTeamReducer: PokemonDetailsReducerObjectType;
};

export const rootReducer = combineReducers<RootReducerState>({
  generationReducer,
  generationByIdReducer,
  pokemonTeamReducer
});
