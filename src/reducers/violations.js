import {
  DELETE_VIOLATION,
  RECIEVE_VIOLATIONS,
  ISSUE_VIOLATION,
  ADD_VIOLATION,
} from "../actions/violations";
import _ from "lodash";

const violations = (
  state = {
    violations: [],
    totalCount: 0,
    currentType: undefined,
    currentPlateNumber: undefined,
    currentPage: 1,
  },
  action
) => {
  switch (action.type) {
    case RECIEVE_VIOLATIONS: {
      const { violations, totalCount, page, type_, plateNumber } = action;
      return {
        ...state,
        violations,
        totalCount,
        currentPage: page,
        currentType: type_,
        currentPlateNumber: plateNumber,
      };
    }
    case ADD_VIOLATION: {
      const { violation } = action;

      if (
        state.currentPage === 1 &&
        (state.currentType === undefined || state.currentType === violation.type) &&
        (state.currentPlateNumber === undefined || state.currentPlateNumber === violation.issuer)
      ) {
        const violations = _.cloneDeep(state.violations);
        violations.pop();
        violations.unshift(violation);
        return {
          ...state,
          violations,
          totalCount: state.totalCount + 1,
        };
      }
      return {
        ...state,
        totalCount: state.totalCount + 1,
      };
    }
    case DELETE_VIOLATION: {
      const { violations, totalCount } = action;
      return {
        ...state,
        violations,
        totalCount,
      };
    }
    case ISSUE_VIOLATION: {
      const { violation } = action;
      const violations = _.cloneDeep(state.violations);
      for (let oldViolation of violations) {
        if (oldViolation.id === violation.id) {
          oldViolation.issued = violation.issued;
          console.log("old violation is", oldViolation);
        }
      }
      console.log("new violations", violations);
      return {
        ...state,
        violations,
      };
    }
    default:
      return state;
  }
};
export default violations;
