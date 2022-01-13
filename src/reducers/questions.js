import {
  ADD_QUESTION,
  RECIEVE_QUESTIONS,
  ANSWER_QUESTION,
  REMOVE_QUESTIONS,
} from "../actions/questions";

const questions = (
  state = {
    answeredQuestions: {},
    unansweredQuestions: {},
  },
  action
) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        unansweredQuestions: {
          ...state.unansweredQuestions,
          [action.question.id]: action.question,
        },
      };
    case RECIEVE_QUESTIONS: {
      const { questions, user } = action;
      let answeredQuestions = { ...state.answeredQuestions };
      let unansweredQuestions = { ...state.unansweredQuestions };
      for (let key in questions) {
        if (key in user.answers) {
          answeredQuestions[key] = { ...questions[key] };
        } else {
          unansweredQuestions[key] = { ...questions[key] };
        }
      }
      return {
        answeredQuestions,
        unansweredQuestions,
      };
    }
    case REMOVE_QUESTIONS:
      return {
        answeredQuestions: {},
        unansweredQuestions: {},
      };
    case ANSWER_QUESTION: {
      let unansweredQuestions = { ...state.unansweredQuestions };
      let answeredQuestions = { ...state.answeredQuestions };
      let question;
      // deep copy from here
      question = { ...unansweredQuestions[action.qid] };
      delete unansweredQuestions[action.qid];
      question[action.answer] = { ...question[action.answer] };
      question[action.answer].votes = [...question[action.answer].votes];
      question[action.answer].votes.push(action.user);
      // till here
      answeredQuestions[action.qid] = question;
      return {
        unansweredQuestions,
        answeredQuestions,
      };
    }
    default:
      return state;
  }
};
export default questions;
