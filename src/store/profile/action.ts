import { AnyAction, Dispatch } from "redux";
import {
  GET_TEAM_POKEMON_START,
  GET_TEAM_POKEMON_SUCCESS,
} from "../actionTypes";

export const getPokemonTeamList = (res: any) => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: GET_TEAM_POKEMON_START });

    dispatch({
      type: GET_TEAM_POKEMON_SUCCESS,
      payload: res || [],
    });
  };
};
