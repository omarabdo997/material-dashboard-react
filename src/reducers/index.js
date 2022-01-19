import authedUser from "./authedUser";
import cars from "./cars";
import violations from "./violations";
import analytics from "./analytics";
import users from "./users";
import questions from "./questions";
import loading from "./loading";
import messages from "./messages";
import { combineReducers } from "redux";

export default combineReducers({
  authedUser,
  users,
  violations,
  analytics,
  questions,
  loading,
  cars,
  messages,
});
