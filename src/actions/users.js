// import {_getUsers} from '../utils/_DATA'

export const RECIEVE_USERS = "RECIEVE_USERS";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export const ANSWER_USER_QUESTION = "ANSWER_USER_QUESTION";
export const ADD_USER = "ADD_USER";

export const recieveUsers = (users) => ({
  type: RECIEVE_USERS,
  users,
});

export const addUserQuestion = (authedUser, question) => ({
  type: ADD_USER_QUESTION,
  authedUser,
  question,
});

export const answerUserQuestion = (qid, user, answer) => ({
  type: ANSWER_USER_QUESTION,
  qid,
  user,
  answer,
});

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});
