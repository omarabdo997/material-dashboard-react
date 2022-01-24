import {
  DELETE_VIOLATION,
  RECIEVE_VIOLATIONS,
  ISSUE_VIOLATION,
  ADD_VIOLATION,
  RECIEVE_VIOLATIONS_COUNTS,
} from "../actions/violations";
import _ from "lodash";

const violations = (
  state = {
    violations: [],
    totalCount: 0,
    currentType: undefined,
    currentPlateNumber: undefined,
    currentPage: 1,
    totalViolations: 0,
    totalSpeedViolations: 0,
    totalDistractedViolations: 0,
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
      let newTotalViolations = state.totalViolations + 1;
      let newTotalSpeedViolations = state.totalSpeedViolations;
      let newTotalDistractedViolations = state.totalDistractedViolations;
      if (violation.type === 1) {
        newTotalSpeedViolations = newTotalSpeedViolations + 1;
      }
      if (violation.type === 3) {
        newTotalDistractedViolations = newTotalDistractedViolations + 1;
      }
      if (
        state.currentPage === 1 &&
        (state.currentType === undefined || state.currentType === violation.type) &&
        (state.currentPlateNumber === undefined || state.currentPlateNumber === violation.issuer)
      ) {
        const violations = _.cloneDeep(state.violations);
        if (violations.length >= 10) violations.pop();
        violations.unshift(violation);
        return {
          ...state,
          violations,
          totalCount: state.totalCount + 1,
          totalViolations: newTotalViolations,
          totalSpeedViolations: newTotalSpeedViolations,
          totalDistractedViolations: newTotalDistractedViolations,
        };
      }
      return {
        ...state,
        totalCount: state.totalCount + 1,
        totalViolations: newTotalViolations,
        totalSpeedViolations: newTotalSpeedViolations,
        totalDistractedViolations: newTotalDistractedViolations,
      };
    }
    case DELETE_VIOLATION: {
      const { violations, totalCount, violation } = action;
      let newTotalViolations = state.totalViolations - 1;
      let newTotalSpeedViolations = state.totalSpeedViolations;
      let newTotalDistractedViolations = state.totalDistractedViolations;
      if (violation.type === 1) {
        newTotalSpeedViolations = newTotalSpeedViolations - 1;
      }
      if (violation.type === 3) {
        newTotalDistractedViolations = newTotalDistractedViolations - 1;
      }
      // if ()
      return {
        ...state,
        violations,
        totalCount,
        totalViolations: newTotalViolations,
        totalSpeedViolations: newTotalSpeedViolations,
        totalDistractedViolations: newTotalDistractedViolations,
      };
    }
    case RECIEVE_VIOLATIONS_COUNTS: {
      const { violationsCounts } = action;
      return {
        ...state,
        totalViolations: violationsCounts.totalViolations,
        totalSpeedViolations: violationsCounts.totalSpeedViolations,
        totalDistractedViolations: violationsCounts.totalDistractedViolations,
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
