import { DELETE_VIOLATION, RECIEVE_VIOLATIONS, ISSUE_VIOLATION } from "../actions/violations";
import _ from "lodash";

const violations = (
  state = {
    violations: [],
    totalCount: 0,
    currentType: undefined,
    currentPage: 1,
  },
  action
) => {
  switch (action.type) {
    case RECIEVE_VIOLATIONS: {
      const { violations, totalCount, page, type_ } = action;
      return {
        ...state,
        violations,
        totalCount,
        currentPage: page,
        currentType: type_,
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
