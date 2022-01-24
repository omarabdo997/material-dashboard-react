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
import {
  recieveViolations,
  deleteViolation,
  issueViolation,
  addViolation,
  RECIEVE_VIOLATIONS_COUNTS,
  recieveViolationsCounts,
} from "./violations";
import { recieveAnalytics } from "./analytics";
import { addMssg } from "./messages";
import {
  addCarAPI,
  getAllCarsApi,
  getCarApi,
  deleteCarAPI,
  updateCarAPI,
  getViolationsAPI,
  deleteViolationAPI,
  issueViolationAPI,
  getAnalyticsAPI,
} from "../utils/API";
import { getUserData } from "../utils/helpers";

export const handleAddCar = (car) => {
  return async (dispatch) => {
    const res = await addCarAPI(car);
    if (res?.success === true) {
      dispatch(addCar(res.car));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "Something went wrong!",
          validators: res?.validators || undefined,
        })
      );
    }
  };
};
export const handleRecieveCars = (page, search = "") => {
  const user = getUserData();
  console.log("user is", user);
  return async (dispatch) => {
    console.log("in dispatch");
    if (!user) {
      return;
    }
    let res;
    if (user.level == 3) {
      console.log("in user 3");
      res = await getCarApi(user?.car?.plateNumber);
      res.cars = res.car ? [res.car] : [];
      res.totalCount = res.car ? 1 : 0;
      console.log("user is and car is", user, res.car);
      res.car && dispatch(showViolations(res.car.plateNumber));
    } else {
      res = await getAllCarsApi(page, search);
    }
    console.log("res is", res);
    if (res?.success === true) {
      console.log("cars are", res);
      dispatch(recieveCars(res.cars, res.totalCount, page, search));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "Something went wrong!",
        })
      );
    }
  };
};

export const handleRecieveAnalytics = (from = undefined, to = undefined) => {
  const user = getUserData();
  return async (dispatch) => {
    if (!user || user.level >= 3) {
      return;
    }
    console.log("in dispatch");
    const res = await getAnalyticsAPI(from, to);
    if (res?.success === true) {
      console.log("analytics are", res);
      dispatch(recieveAnalytics(res.analyticsAvg, res.analyticsCount, res.from, res.to));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "Something went wrong!",
        })
      );
    }
  };
};

export const handleDeleteCar = (plateNumber) => {
  return async (dispatch, getState) => {
    const res = await deleteCarAPI(plateNumber);
    if (res?.success === true) {
      const { currentPage, currentSearch } = getState().cars;
      console.log("current page is", currentPage);
      const res2 = await getAllCarsApi(currentPage, currentSearch);
      dispatch(deleteCar(res2.cars, res2.totalCount));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "Something went wrong!",
          validators: res?.validators || undefined,
        })
      );
    }
  };
};

export const handleUpdateCar = (car, plateNumber) => {
  return async (dispatch) => {
    const res = await updateCarAPI(car, plateNumber);
    if (res?.success === true) {
      dispatch(editCar(res.car, plateNumber));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "Something went wrong!",
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
  const user = getUserData();
  return async (dispatch) => {
    if (!user) {
      return;
    }
    console.log("in dispatch violations");
    let res;
    if (user.level == 3) {
      if (user?.car) {
        res = await getViolationsAPI(page, type, user.car.plateNumber);
        plateNumber = user.car.plateNumber;
      } else {
        return;
      }
    } else {
      res = await getViolationsAPI(page, type, plateNumber);
    }
    if (res?.success === true) {
      console.log("violations are", res.violations);
      dispatch(recieveViolations(res.violations, res.totalCount, page, type, plateNumber));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "Something went wrong!",
        })
      );
    }
  };
};

export const handleRecieveViolationsCount = () => {
  const user = getUserData();
  return async (dispatch) => {
    if (!user || user.level >= 3) {
      return;
    }
    const res1 = await getViolationsAPI(1);
    const res2 = await getViolationsAPI(1, 1);
    const res3 = await getViolationsAPI(1, 3);

    if (res1?.success === true && res2?.success === true && res3?.success === true) {
      const violationsCounts = {
        totalViolations: res1.totalCount,
        totalSpeedViolations: res2.totalCount,
        totalDistractedViolations: res3.totalCount,
      };
      dispatch(recieveViolationsCounts(violationsCounts));
    } else {
      dispatch(
        addMssg({
          errorMessage: res1?.message || "Something went wrong!",
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
    const violation = getState().violations.violations.filter(
      (violation) => violation.id === id
    )[0];
    if (res?.success === true) {
      const { currentPage, currentType, currentPlateNumber } = getState().violations;
      const res2 = await getViolationsAPI(currentPage, currentType, currentPlateNumber);
      dispatch(deleteViolation(res2.violations, res2.totalCount, violation));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "Something went wrong!",
          validators: res?.validators || undefined,
        })
      );
    }
  };
};

export const handleIssueViolation = (id) => {
  return async (dispatch) => {
    const res = await issueViolationAPI(id);
    if (res?.success === true) {
      dispatch(issueViolation(res.violation));
    } else {
      dispatch(
        addMssg({
          errorMessage: res?.message || "Something went wrong!",
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
