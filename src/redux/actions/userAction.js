import store from "../store";

export const createNewUser = (payload) => (dispatch) => {
  let emails = store.getState().user.emails ? store.getState().user.emails : [];
  let users = store.getState().user.users;
  let email = payload.email;

  // console.log({ emails });
  if (emails.indexOf(email) !== -1) {
    dispatch({
      type: "SHOW_SNACKBAR",
      message: "USER ALREADY EXISTS",
      variant: "warning",
    });
  } else {
    users[email] = payload;
    emails.push(email);
    let data = {
      emails: emails,
      users: users,
    };
    dispatch({
      type: "SHOW_SNACKBAR",
      message: "NEW USER CREATION SUCCESSFUL",
      variant: "success",
    });
    dispatch({
      type: "NEW_USER",
      payload: data,
    });
    dispatch({ type: "LOGIN_USER", payload: payload });
  }
};

export const signInUser = (payload) => (dispatch) => {
  let users = store.getState().user.users ? store.getState().user.users : {};
  let emails = store.getState().user.emails ? store.getState().user.emails : [];
  let email = payload.email;
  let password = payload.password;

  // console.log({ emails });

  if (emails.indexOf(email) !== -1) {
    let user = users[email];
    if (user.password === password) {
      dispatch({
        type: "SHOW_SNACKBAR",
        message: "LOGIN SUCCESSFULL",
        variant: "success",
      });
      dispatch({ type: "LOGIN_USER", payload: user });
    } else {
      dispatch({
        type: "SHOW_SNACKBAR",
        message: "PASSWORD INCORRECT",
        variant: "error",
      });
    }
  } else {
    dispatch({
      type: "SHOW_SNACKBAR",
      message: "USER NOT FOUND",
      variant: "error",
    });
  }
};

export const signOutUser = (payload) => (dispatch) => {
  dispatch({
    type: "SHOW_SNACKBAR",
    message: "USER LOGGED OUT",
    variant: "info",
  });
  dispatch({ type: "LOGOUT_USER" });
};

export const viewProfile = (payload) => (dispatch) => {
  dispatch({
    type: "SHOW_SNACKBAR",
    message: "SHOWING USER PROFILE",
    variant: "info",
  });
  dispatch({ type: "VIEW_PROFILE" });
};

export const closeProfile = (payload) => (dispatch) => {
  dispatch({ type: "CLOSE_PROFILE" });
};

export const updateUserData = (payload) => (dispatch) => {
  let users = store.getState().user.users ? store.getState().user.users : {};

  let data = payload;
  let email = payload.email;

  users[email] = data;
  dispatch({ type: "UPDATE_USER", payload: users });
  dispatch({
    type: "SHOW_SNACKBAR",
    message: "USER DETAILS UPDATED",
    variant: "success",
  });
};
