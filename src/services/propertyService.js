import http from "./http-common";

const addProperty = data => {
  return http.post("/properties", data, { headers: { Authorization: "Bearer " + localStorage.token } } );
};

const listProperty = () => {
  return http.get("/properties", { headers: { Authorization: "Bearer " + localStorage.token } });
};

const deactivateProperty = (data) => {
  return http.put("/properties/"+ data.id + "/deactivate", data, { headers: { Authorization: "Bearer " + localStorage.token }});
};

const updateProperty = (data) => {
  return http.put("/properties/"+ data.id, data, { headers: { Authorization: "Bearer " + localStorage.token }});
};

const deleteProperty = (data) => {
  return http.delete("/properties/"+ data.id, { headers: { Authorization: "Bearer " + localStorage.token }});
};

const buyProperty = (data) => {
  return http.put("/properties/"+ data.id + "/availability", data, { headers: { Authorization: "Bearer " + localStorage.token }});
};

const addOwner = (data) => {
  return http.post("/properties/"+ data.id + "/add_owner", data, { headers: { Authorization: "Bearer " + localStorage.token }});
};

const MyProperties = () => {
  return http.get("/properties/me", { headers: { Authorization: "Bearer " + localStorage.token } });
};

const showProperty = (data) => {
  return http.get("/properties/" + data.id, { headers: { Authorization: "Bearer " + localStorage.token } });
};

const updateApprovalStatus = (data) => {
  return http.put("/properties/"+ data.id + "/approval_status", data, { headers: { Authorization: "Bearer " + localStorage.token }});
};


export const propertyService = {
    addProperty, listProperty, deactivateProperty, updateProperty, deleteProperty, buyProperty, 
    addOwner, MyProperties, showProperty, updateApprovalStatus
};
