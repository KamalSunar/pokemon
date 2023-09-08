export const BASE_URI = process.env.REACT_APP_BASE_URI;

export const API_ENDPOINTS = {
    GET_GENERATIONS_LIST: `${BASE_URI}/generation`,
    GET_POKEMON_DETAILS: `${BASE_URI}/pokemon`,
    GET_POKEMON_SPECIES_DETAILS: `${BASE_URI}/pokemon-species`,
    GET_EVOLUTION_DETAILS: `${BASE_URI}/evolution-chain`
}