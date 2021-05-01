import store from "../store";

export const addTeam = (payload) => (dispatch) => {
  let teams = store.getState().user.teams;
  teams.push(payload);
  dispatch({ type: "UPDATE_TEAM", payload: teams });
  dispatch({
    type: "SHOW_SNACKBAR",
    message: "NEW TEAM ADDED",
    variant: "success",
  });
  window.localStorage.setItem("team", JSON.stringify(teams));
};

export const removeTeam = (payload) => (dispatch) => {
  let teams = store.getState().user.teams;
  let players = store.getState().user.player;
  let value = teams[payload];
  teams = teams.filter((item) => item !== value);
  players = players.filter((item) => item.team !== value.name);

  dispatch({
    type: "UPDATE_PLAYER",
    payload: { teams, players },
  });
  dispatch({
    type: "SHOW_SNACKBAR",
    message: "TEAM DELETED SUCCESSFULLY",
    variant: "success",
  });
  window.localStorage.setItem("team", JSON.stringify(teams));
  window.localStorage.setItem("player", JSON.stringify(players));
};

export const addPlayer = (payload) => (dispatch) => {
  let teams = store.getState().user.teams;
  let players = store.getState().user.player;
  let index = payload.index;
  let player_name = payload.name;

  teams[index].players.push(player_name);
  players.push({ name: player_name, team: teams[index].name });

  dispatch({
    type: "UPDATE_PLAYER",
    payload: { teams: teams, players: players },
  });
  dispatch({
    type: "SHOW_SNACKBAR",
    message: "PLAYER ADDED SUCCESSFULLY",
    variant: "success",
  });
  window.localStorage.setItem("team", JSON.stringify(teams));
  window.localStorage.setItem("player", JSON.stringify(players));
};

export const removePlayer = (payload) => (dispatch) => {
  let teams = store.getState().user.teams;
  let players = store.getState().user.player;

  console.log({ payload });
  let player_name = payload.name;
  let value = teams[payload.index].players;

  value = value.filter((item) => item !== player_name);
  teams[payload.index].players = value;
  players = players.filter((item) => item.name !== player_name);

  console.log({ teams, players });
  dispatch({ type: "UPDATE_PLAYER", payload: { teams, players } });
  dispatch({
    type: "SHOW_SNACKBAR",
    message: "PLAYER DELETED SUCCESSFULLY",
    variant: "success",
  });
  window.localStorage.setItem("team", JSON.stringify(teams));
  window.localStorage.setItem("player", JSON.stringify(players));
};
export const updateFromLocalStorage = (payload) => (dispatch) => {
  let teams = JSON.parse(window.localStorage.getItem("team"));
  let players = JSON.parse(window.localStorage.getItem("player"));
  dispatch({
    type: "UPDATE_FROM_LOCAL_STORAGE",
    payload: { teams: teams ? teams : [], players: players ? players : [] },
  });
  dispatch({
    type: "SHOW_SNACKBAR",
    message: "DATA LOADED SUCCESSFULLY",
    variant: "success",
  });
};
