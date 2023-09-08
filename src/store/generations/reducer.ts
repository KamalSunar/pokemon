import {
  type DefaultReducerObjectType,
  type DefaultActionListType,
} from "../../types";
import {
  GET_GENERATIONS_TYPE_LIST_FAIL,
  GET_GENERATIONS_TYPE_LIST_START,
  GET_GENERATIONS_TYPE_LIST_SUCCESS,
} from "../actionTypes";

const initialState: DefaultReducerObjectType = {
  loading: false,
  error: false,
  data: [],
};

export const generationReducer = (
  state = initialState,
  action: DefaultActionListType
): DefaultReducerObjectType => {
  switch (action.type) {
    case GET_GENERATIONS_TYPE_LIST_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case GET_GENERATIONS_TYPE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_GENERATIONS_TYPE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
