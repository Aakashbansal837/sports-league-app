export const showSnackbar = (value) => (dispatch) => {
  dispatch({
    type: "SHOW_SNACKBAR",
    message: value.message,
    variant: value.variant,
  });
};

export const hideSnackbar = (value) => (dispatch) => {
  dispatch({ type: "HIDE_SNACKBAR" });
};
