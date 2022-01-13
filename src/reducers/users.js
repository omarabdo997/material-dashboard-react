import { RECIEVE_USERS, ADD_USER_QUESTION, ANSWER_USER_QUESTION, ADD_USER } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECIEVE_USERS:
      let users = { ...action.users };
      for (let key in action.users) {
        const answeredQuestions = Object.keys(action.users[key].answers).length;
        const askedQuestions = action.users[key].questions.length;
        users[key] = { ...users[key] };
        users[key].score = answeredQuestions + askedQuestions;
      }
      return {
        ...state,
        ...users,
      };
    case ADD_USER:
      return {
        ...state,
        [action.user.id]: {
          ...action.user,
          score: 0,
        },
      };
    case ADD_USER_QUESTION: {
      const { authedUser, question } = action;
      const users = { ...state };
      users[authedUser] = { ...users[authedUser] };
      users[authedUser].questions = users[authedUser].questions.concat([question]);
      users[authedUser].score += 1;
      return users;
    }
    case ANSWER_USER_QUESTION: {
      const { qid, user, answer } = action;
      const users = { ...state };
      users[user] = { ...users[user] };
      users[user].answers = { ...users[user].answers };
      users[user].answers[qid] = answer;
      users[user].score += 1;
      return users;
    }
    default:
      return state;
  }
}
