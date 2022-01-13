export const DELETE_VIOLATION = "DELETE_VIOLATION";
export const RECIEVE_VIOLATIONS = "RECIEVE_VIOLATIONS";
export const ISSUE_VIOLATION = "ISSUE_VIOLATION";

export const recieveViolations = (violations, totalCount, page, type_) => ({
  type: RECIEVE_VIOLATIONS,
  violations,
  totalCount,
  page,
  type_,
});

export const deleteViolation = (violations, totalCount) => ({
  type: DELETE_VIOLATION,
  violations,
  totalCount,
});

export const issueViolation = (violation) => ({
  type: ISSUE_VIOLATION,
  violation,
});
