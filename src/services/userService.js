import http from "./http-common";

const login = data => {
  return http.post("/users/login", data);
};

const signUp = data => {
  return http.post("/users/signup", data);
};

const addUser = data => {
  return http.post("/users", data, { headers: { Authorization: "Bearer " + localStorage.token }});
};

const listUser = () => {
  return http.get("/users", { headers: { Authorization: "Bearer " + localStorage.token }});
};

const deactivateUser = (data) => {
  return http.put("/users/"+ data.id + "/deactivate", data, { headers: { Authorization: "Bearer " + localStorage.token }});
};

const updateUser = (data) => {
  return http.put("/users/"+ data.id, data, { headers: { Authorization: "Bearer " + localStorage.token }});
};

const deleteUser = (data) => {
  return http.delete("/users/"+ data.id, { headers: { Authorization: "Bearer " + localStorage.token }});
};

const showUser = (data) => {
  return http.get("/users/" + data.id, { headers: { Authorization: "Bearer " + localStorage.token }});
}

export const userService = {
  login, signUp, addUser, listUser, deactivateUser, updateUser, deleteUser, showUser
};
