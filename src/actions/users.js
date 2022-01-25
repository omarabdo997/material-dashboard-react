export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const RECIEVE_USERS = "RECIEVE_USERS";

export const addUserAction = (user) => ({
  type: ADD_USER,
  user,
});

export const recieveUsersAction = (users, totalCount, page, search) => ({
  type: RECIEVE_USERS,
  users,
  totalCount,
  page,
  search,
});

export const deleteUserAction = (users, totalCount) => ({
  type: DELETE_USER,
  users,
  totalCount,
});

export const editUserAction = (user) => ({
  type: EDIT_USER,
  user,
});
