// src/constants/apiEndpoints.js
import { BASE_URL } from "./config";

export const API_ENDPOINTS = {
  GET_ALL_GAMES: `${BASE_URL}/allgames`,
  GET_GAME_BY_ID: (id) => `${BASE_URL}/game/${id}`,
  ADD_GAME: `${BASE_URL}/addgame`,
  UPDATE_GAME: (id) => `${BASE_URL}/updategame/${id}`,
  DELETE_GAME: (id) => `${BASE_URL}/deletegame/${id}`,
  DELETE_GAMES_BY_FILTER: `${BASE_URL}/deletegames`,
};
