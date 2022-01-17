import { setLoading } from "./loading";
import { authUser, unauthUser } from "./authedUser";
import { recieveUsers, addUserQuestion, answerUserQuestion, addUser } from "./users";
import { addQuestion } from "./questions";
import {
  addCar,
  recieveCars,
  deleteCar,
  editCar,
  showViolations,
  setTracked,
  updateCoord,
} from "./cars";
import { recieveViolations, deleteViolation, issueViolation, addViolation } from "./violations";
import { recieveQuestions, removeQuestions, answerQuestion } from "./questions";
import { addMssg } from "./messages";
import {
  addCarAPI,
  getAllCarsApi,
  deleteCarAPI,
  updateCarAPI,
  getViolationsAPI,
  deleteViolationAPI,
  issueViolationAPI,
} from "../utils/API";

export const handleAddCar = (car) => {
  return async (dispatch) => {
    const res = await addCarAPI(car);
    if (res.success === true) {
      dispatch(addCar(res.car));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "unkown",
          validators: res?.validators || undefined,
        })
      );
    }
  };
};
export const handleRecieveCars = (page, search = "") => {
  return async (dispatch) => {
    console.log("in dispatch");
    const res = await getAllCarsApi(page, search);
    if (res.success === true) {
      console.log("cars are", res);
      dispatch(recieveCars(res.cars, res.totalCount, page, search));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "unkown",
        })
      );
    }
  };
};

export const handleDeleteCar = (plateNumber) => {
  return async (dispatch, getState) => {
    const res = await deleteCarAPI(plateNumber);
    if (res.success === true) {
      const { currentPage, currentSearch } = getState().cars;
      console.log("current page is", currentPage);
      const res2 = await getAllCarsApi(currentPage, currentSearch);
      dispatch(deleteCar(res2.cars, res2.totalCount));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "unkown",
          validators: res?.validators || undefined,
        })
      );
    }
  };
};

export const handleUpdateCar = (car, plateNumber) => {
  return async (dispatch) => {
    const res = await updateCarAPI(car, plateNumber);
    if (res.success === true) {
      dispatch(editCar(res.car, plateNumber));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "unkown",
          validators: res?.validators || undefined,
        })
      );
    }
  };
};

export const handleShowViolations = (plateNumber) => {
  return (dispatch) => {
    dispatch(showViolations(plateNumber));
  };
};

export const handleSetTracked = (plateNumber) => {
  return (dispatch) => {
    dispatch(setTracked(plateNumber));
  };
};

export const handleUpdateCoord = (car) => {
  return (dispatch) => {
    dispatch(updateCoord(car));
  };
};

export const handleRecieveViolations = (page, type = undefined, plateNumber = undefined) => {
  return async (dispatch) => {
    console.log("in dispatch violations");
    const res = await getViolationsAPI(page, type, plateNumber);
    if (res.success === true) {
      console.log("violations are", res.violations);
      dispatch(recieveViolations(res.violations, res.totalCount, page, type, plateNumber));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "unkown",
        })
      );
    }
  };
};
export const handleAddViolation = (violation) => {
  return (dispatch) => {
    console.log("in add violation");
    dispatch(addViolation(violation));
  };
};

export const handleDeleteViolation = (id) => {
  return async (dispatch, getState) => {
    const res = await deleteViolationAPI(id);
    if (res.success === true) {
      const { currentPage, currentType, currentPlateNumber } = getState().violations;
      const res2 = await getViolationsAPI(currentPage, currentType, currentPlateNumber);
      dispatch(deleteViolation(res2.violations, res2.totalCount));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "unkown",
          validators: res?.validators || undefined,
        })
      );
    }
  };
};

export const handleIssueViolation = (id) => {
  return async (dispatch) => {
    const res = await issueViolationAPI(id);
    if (res.success === true) {
      dispatch(issueViolation(res.violation));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "unkown",
          validators: res?.validators || undefined,
        })
      );
    }
  };
};

// export function handleAuthUser(authedUser) {
//   return (dispatch, getState) => {
//     dispatch(authUser(authedUser));
//     dispatch(setLoading(true));
//     const { users } = getState();
//     const user = users[authedUser];
//     _getQuestions().then((questions) => {
//       dispatch(recieveQuestions(questions, user));
//       dispatch(setLoading(false));
//     });
//   };
// }

// export function handleUnauthUser() {
//   return (dispatch) => {
//     dispatch(removeQuestions());
//     dispatch(unauthUser());
//   };
// }

// export const handleRecieveUsers = () => {
//   return (dispatch) => {
//     dispatch(setLoading(true));
//     _getUsers().then((users) => {
//       dispatch(recieveUsers(users));
//       dispatch(setLoading(false));
//     });
//   };
// };

// export const handleAddUser = (user) => {
//   return (dispatch) => {
//     _addUser(user)
//       .then((user) => {
//         dispatch(addUser(user));
//         dispatch(addMssg({ redirect: "/signin" }));
//       })
//       .catch((mssg) => {
//         dispatch(addMssg({ error: mssg }));
//       });
//   };
// };

// export const handleAddQuestion = (question, authedUser) => {
//   return (dispatch) => {
//     dispatch(setLoading(true));
//     _saveQuestion(question).then((questionFormated) => {
//       dispatch(addQuestion(questionFormated));
//       dispatch(addUserQuestion(authedUser, questionFormated));
//       dispatch(setLoading(false));
//     });
//   };
// };

// export const handleAnswerQuestion = (qid, authedUser, answer) => {
//   return (dispatch) => {
//     dispatch(setLoading(true));
//     _saveQuestionAnswer({ qid, authedUser, answer }).then(() => {
//       dispatch(answerQuestion(qid, authedUser, answer));
//       dispatch(answerUserQuestion(qid, authedUser, answer));
//       dispatch(setLoading(false));
//     });
//   };
// };
