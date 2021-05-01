const initialState = {
  users: {},
  currentUser: {},
  emails: [],
  is_logged_in: false,
  view_profile: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_USER":
      return {
        ...state,
        users: action.payload.users,
        emails: action.payload.emails,
      };
    case "LOGIN_USER":
      return {
        ...state,
        is_logged_in: true,
        currentUser: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        is_logged_in: false,
        view_profile: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: action.payload,
      };
    case "VIEW_PROFILE":
      return {
        ...state,
        view_profile: true,
      };
    case "CLOSE_PROFILE":
      return {
        ...state,
        view_profile: false,
      };

    default:
      return state;
  }
};

export default userReducer;
