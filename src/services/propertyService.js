import http from "./http-common";

const addProperty = data => {
  return http.post("/properties", data, { headers: { Authorization: "Bearer " + localStorage.token } } );
};

const listProperty = () => {
  return http.get("/properties", { headers: { Authorization: "Bearer " + localStorage.token } });
};

export const propertyService = {
    addProperty, listProperty
};
