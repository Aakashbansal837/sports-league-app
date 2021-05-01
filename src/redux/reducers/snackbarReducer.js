const initialState = {
  show: false,
  message: "",
  variant: "info",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      return {
        ...state,
        show: true,
        message: action.message,
        variant: action.variant,
      };
    case "HIDE_SNACKBAR":
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export default userReducer;
