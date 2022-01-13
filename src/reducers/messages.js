import { ADD_MSSG, REMOVE_MSSG } from "../actions/messages";

export default function messages(state = {}, action) {
  switch (action.type) {
    case ADD_MSSG:
      return {
        ...state,
        ...action.mssg,
      };
    case REMOVE_MSSG:
      return {};
    default:
      return state;
  }
}
