export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";

export function authUser(id) {
  return {
    type: AUTH_USER,
    id,
  };
}

export function unauthUser() {
  return {
    type: UNAUTH_USER,
  };
}
