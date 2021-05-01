const initialState = {
  player: [],
  teams: [],

  // structure
  // player: [{ name: "default", team: "team 1" }],
  // teams: [{ name: "default", players: ["player 1", "player 2"] }],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_USER":
      return {
        ...state,
        player: action.payload.player,
      };
    case "UPDATE_TEAM":
      return {
        ...state,
        teams: action.payload,
      };
    case "UPDATE_PLAYER":
      return {
        ...state,
        teams: action.payload.teams,
        player: action.payload.players,
      };
    case "UPDATE_FROM_LOCAL_STORAGE":
      return {
        ...state,
        teams: action.payload.teams,
        player: action.payload.players,
      };

    default:
      return state;
  }
};

export default userReducer;
