import { AnyAction, Dispatch } from "redux";
import {
  GET_GENERATIONS_POKEMON_LIST_FAIL,
  GET_GENERATIONS_POKEMON_LIST_START,
  GET_GENERATIONS_POKEMON_LIST_SUCCESS,
} from "../actionTypes";
import { API_ENDPOINTS } from "../apiEndPoints";
import Axios from "axios";

export const getGenerationPokemonList = (id: number) => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: GET_GENERATIONS_POKEMON_LIST_START });

    Axios.get(`${API_ENDPOINTS.GET_GENERATIONS_LIST}/${id}`)
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_GENERATIONS_POKEMON_LIST_SUCCESS,
            payload: res.data.pokemon_species,
          });
        } else {
          dispatch({ type: GET_GENERATIONS_POKEMON_LIST_FAIL });
        }
      })
      .catch(() => {
        dispatch({ type: GET_GENERATIONS_POKEMON_LIST_FAIL });
      });
  };
};
