import { combineReducers } from "redux";
import { userInfoSlice } from "./slices/userInfoSlice";
import { userPostsSlice } from "./slices/userPostsSlice";

export const rootReducer = combineReducers({
  userInfoReducer: userInfoSlice,
  userPostsReducer: userPostsSlice,
});
