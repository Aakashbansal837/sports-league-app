import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

var middlewares = [];
middlewares.push(thunk);

const middlewareThunk = applyMiddleware(...middlewares);

export default createStore(reducer, middlewareThunk);
