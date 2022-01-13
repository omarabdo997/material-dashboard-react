import { AUTH_USER, UNAUTH_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.id;
    case UNAUTH_USER:
      return null;
    default:
      return state;
  }
}
