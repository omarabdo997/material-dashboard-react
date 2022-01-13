import { SET_LOADING } from "../actions/loading";

const loading = (state = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return action.loading;
    default:
      return state;
  }
};
export default loading;
