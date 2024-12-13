// src/constants/apiEndpoints.js
import { BASE_URL } from "./config";
//Games
export const GET_ALL_GAMES = `${BASE_URL}/api/games/allgames`;
export const GET_GAME_BY_ID = (id) => `${BASE_URL}/api/games/game/${id}`;
export const ADD_GAME = `${BASE_URL}/api/games/addgame`;
export const UPDATE_GAME = (id) => `${BASE_URL}/api/games/updategame/${id}`;
export const DELETE_GAME = (id) => `${BASE_URL}/api/games/deletegame/${id}`;

  //Users
  export const GET_ALL_USERS = `${BASE_URL}/api/user/allusers`;
  export const GET_USER_BY_ID = (id) => `${BASE_URL}/api/user/user/${id}`;
  
  export const UPDATE_USER = (id) => `${BASE_URL}/api/user/user/${id}`;
  export const DELETE_USER = (id) => `${BASE_URL}/api/user/user/${id}`;
  
  export const UPDATE_USER_PASSWORD = (id) => `${BASE_URL}/api/user/user/${id}/password`;
  export const USER_LOGIN = `${BASE_URL}/api/user/login`;
  export const REGISTER_USER = `${BASE_URL}/api/user/register`;

//Admin 
export const ADMIN_LOGIN = `${BASE_URL}/api/admin/admin-login`;
export const ADD_USER_BY_ADMIN = `${BASE_URL}/api/admin/user`;