export const ADD_QUESTION = "ADD_QUESTION";
export const RECIEVE_QUESTIONS = "RECIEVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const REMOVE_QUESTIONS = "REMOVE_QUESTIONS";

export const addQuestion = (question) => ({
  type: ADD_QUESTION,
  question,
});

export const recieveQuestions = (questions, user) => ({
  type: RECIEVE_QUESTIONS,
  questions,
  user,
});

export const removeQuestions = () => ({
  type: REMOVE_QUESTIONS,
});

export const answerQuestion = (qid, user, answer) => ({
  type: ANSWER_QUESTION,
  qid,
  user,
  answer,
});
