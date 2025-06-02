import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension"; // Or @redux-devtools/extension
import { thunk } from "redux-thunk";
import rootReducer from "./reducers"; // Your combined reducers

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
