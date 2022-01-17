import {
  ADD_CAR,
  RECIEVE_CARS,
  EDIT_CAR,
  DELETE_CAR,
  SHOW_VIOLATIONS,
  SET_TRACKED,
  UPDATE_COORD,
} from "../actions/cars";
import _ from "lodash";

const randomHex = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const cars = (
  state = {
    cars: [],
    totalCount: 0,
    currentPage: 1,
    currentShownPlate: undefined,
    currentSearch: "",
  },
  action
) => {
  switch (action.type) {
    case ADD_CAR:
      const updatedCars = _.cloneDeep(state.cars);
      updatedCars.pop();
      action.car.color = randomHex();
      action.car.isTracked = false;
      updatedCars.unshift(action.car);
      return {
        ...state,
        cars: updatedCars,
        totalCount: state.totalCount + 1,
      };
    case RECIEVE_CARS: {
      const { cars, totalCount, page, search } = action;
      let i = 0;
      for (let car of cars) {
        if (i === 0) {
          car.isTracked = true;
        }

        car.color = randomHex();
        car.showViolations = false;
        if (car.plateNumber === state.currentShownPlate) {
          car.showViolations = true;
        }
        i++;
      }
      return {
        ...state,
        cars: cars,
        totalCount,
        currentPage: page,
        currentSearch: search,
      };
    }
    case DELETE_CAR: {
      const { cars, totalCount } = action;
      return {
        ...state,
        cars,
        totalCount,
      };
    }
    case EDIT_CAR: {
      const { car, plateNumber } = action;
      const updatedCars = _.cloneDeep(state.cars);
      for (let oldCar of updatedCars) {
        if (oldCar.plateNumber === plateNumber) {
          Object.keys(oldCar).forEach((key) => {
            oldCar[key] = car[key];
          });
        }
      }
      return {
        ...state,
        cars: updatedCars,
      };
    }
    case SHOW_VIOLATIONS: {
      const { plateNumber } = action;
      const updatedCars = _.cloneDeep(state.cars);
      for (let oldCar of updatedCars) {
        if (oldCar.plateNumber === plateNumber) {
          oldCar.showViolations = true;
        } else {
          oldCar.showViolations = false;
        }
      }
      return {
        ...state,
        currentShownPlate: plateNumber,
        cars: updatedCars,
      };
    }
    case SET_TRACKED: {
      const { plateNumber } = action;
      const updatedCars = _.cloneDeep(state.cars);
      for (let oldCar of updatedCars) {
        if (oldCar.plateNumber === plateNumber) {
          oldCar.isTracked = !oldCar.isTracked;
        } else {
          oldCar.isTracked = false;
        }
      }
      return {
        ...state,
        cars: updatedCars,
      };
    }
    case UPDATE_COORD: {
      const { car } = action;
      const updatedCars = _.cloneDeep(state.cars);
      for (let oldCar of updatedCars) {
        if (oldCar.plateNumber === car.plateNumber) {
          oldCar.lastLat = car.lastLat;
          oldCar.lastLng = car.lastLng;
          oldCar.updateCoordTime = car.updateCoordTime;
        }
      }
      return {
        ...state,
        cars: updatedCars,
      };
    }
    default:
      return state;
  }
};
export default cars;
