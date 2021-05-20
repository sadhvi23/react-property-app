import http from "./http-common";

const login = data => {
  return http.post("/users/login", data);
};

const signUp = data => {
  return http.post("/users/signup", data);
};

export const userService = {
  login, signUp
};
