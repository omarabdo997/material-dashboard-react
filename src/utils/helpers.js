import jwt from "jwt-decode";

export const isAuth = (levels) => {
  const token = localStorage.getItem("token");
  console.log("the token is", token, levels);
  if (token) {
    const decodedToken = jwt(token);
    if (Date.now() <= decodedToken.exp * 1000 && levels.includes(decodedToken.level)) {
      return true;
    }
  }

  return false;
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt(token);
    if (Date.now() <= decodedToken.exp * 1000) {
      return true;
    }
  }
  return false;
};

export const getUserData = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt(token);
    if (Date.now() <= decodedToken.exp * 1000) {
      return decodedToken;
    }
  }
  return undefined;
};

export const signOut = () => {
  const token = localStorage.removeItem("token");
};
