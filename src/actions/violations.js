export const DELETE_VIOLATION = "DELETE_VIOLATION";
export const RECIEVE_VIOLATIONS = "RECIEVE_VIOLATIONS";
export const ADD_VIOLATION = "ADD_VIOLATION";
export const ISSUE_VIOLATION = "ISSUE_VIOLATION";
export const RECIEVE_VIOLATIONS_COUNTS = "RECIEVE_VIOLATIONS_COUNTS";

export const recieveViolations = (violations, totalCount, page, type_, plateNumber) => ({
  type: RECIEVE_VIOLATIONS,
  violations,
  totalCount,
  page,
  type_,
  plateNumber,
});

export const recieveViolationsCounts = (violationsCounts) => ({
  type: RECIEVE_VIOLATIONS_COUNTS,
  violationsCounts,
});

export const addViolation = (violation) => ({
  type: ADD_VIOLATION,
  violation,
});

export const deleteViolation = (violations, totalCount, violation) => ({
  type: DELETE_VIOLATION,
  violations,
  totalCount,
  violation,
});

export const issueViolation = (violation) => ({
  type: ISSUE_VIOLATION,
  violation,
});
