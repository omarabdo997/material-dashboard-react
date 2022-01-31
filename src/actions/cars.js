export const ADD_CAR = "ADD_CAR";
export const EDIT_CAR = "EDI_CAR";
export const DELETE_CAR = "DELETE_CAR";
export const RECIEVE_CARS = "RECIEVE_CARS";
export const SHOW_VIOLATIONS = "SHOW_VIOLATIONS";
export const SET_TRACKED = "SET_TRACKED";
export const UPDATE_COORD = "UPDATE_COORD";
export const UPDATE_SPEED = "UPDATE_SPEED";

export const addCar = (car) => ({
  type: ADD_CAR,
  car,
});

export const recieveCars = (cars, totalCount, page, search) => ({
  type: RECIEVE_CARS,
  cars,
  totalCount,
  page,
  search,
});

export const deleteCar = (cars, totalCount) => ({
  type: DELETE_CAR,
  cars,
  totalCount,
});

export const editCar = (car, plateNumber) => ({
  type: EDIT_CAR,
  car,
  plateNumber,
});

export const updateCoord = (car) => ({
  type: UPDATE_COORD,
  car,
});

export const updateCarSpeed = (car, token) => ({
  type: UPDATE_SPEED,
  car,
  token,
});

export const showViolations = (plateNumber) => ({
  type: SHOW_VIOLATIONS,
  plateNumber,
});

export const setTracked = (plateNumber) => ({
  type: SET_TRACKED,
  plateNumber,
});
