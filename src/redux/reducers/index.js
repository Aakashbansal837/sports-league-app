import { combineReducers } from "redux";
import user from "./userReducer";
import snackbar from "./snackbarReducer";

export default combineReducers({
  user,
  snackbar,
});
