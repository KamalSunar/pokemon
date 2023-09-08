import {
  type DefaultActionListType,
  type PokemonDetailsReducerObjectType,
} from "../../types";
import {
  GET_TEAM_POKEMON_START,
  GET_TEAM_POKEMON_SUCCESS,
} from "../actionTypes";

const initialState: PokemonDetailsReducerObjectType = {
  loading: false,
  error: false,
  data: [],
};

export const pokemonTeamReducer = (
  state = initialState,
  action: DefaultActionListType
): PokemonDetailsReducerObjectType => {
  switch (action.type) {
    case GET_TEAM_POKEMON_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_TEAM_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload as any[],
      };
    default:
      return state;
  }
};
