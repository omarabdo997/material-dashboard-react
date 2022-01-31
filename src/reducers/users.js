import { ADD_USER, RECIEVE_USERS, EDIT_USER, DELETE_USER } from "../actions/users";
import _ from "lodash";

const users = (
  state = {
    users: [],
    totalCount: 0,
    currentPage: 1,
    currentSearch: "",
  },
  action
) => {
  switch (action.type) {
    case ADD_USER:
      const updatedUsers = _.cloneDeep(state.users);
      if (updatedUsers.length >= 10) updatedUsers.pop();
      updatedUsers.unshift(action.user);
      return {
        ...state,
        users: updatedUsers,
        totalCount: state.totalCount + 1,
      };
    case RECIEVE_USERS: {
      const { users, totalCount, page, search } = action;
      return {
        ...state,
        users,
        totalCount,
        currentPage: page,
        currentSearch: search,
      };
    }
    case DELETE_USER: {
      const { users, totalCount } = action;
      return {
        ...state,
        users,
        totalCount,
      };
    }
    case EDIT_USER: {
      const { user, token } = action;
      token && localStorage.setItem("token", token);
      const updatedUsers = _.cloneDeep(state.users);
      for (let oldUser of updatedUsers) {
        if (oldUser.id === user?.id) {
          Object.keys(oldUser).forEach((key) => {
            oldUser[key] = _.cloneDeep(user[key]);
          });
        }
      }
      return {
        ...state,
        users: updatedUsers,
      };
    }
    default:
      return state;
  }
};
export default users;
