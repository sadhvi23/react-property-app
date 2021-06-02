import React, { useState } from "react";

import PropertyItem from "./propertyItem";
import { myProperties} from "../actions/properties";
import { useDispatch } from "react-redux";

const MyProperties = () => {

  const dispatch = useDispatch();

  const intialValues = {
    properties: [],
    message: ""
  }
  const [data, setData] = useState(intialValues);

  // Show logged in user profile
  if (data.properties.length === 0) {
    dispatch(myProperties())
    .then(res => { 
      setData({ ...data, properties: res, message: "Request has been processed successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, properties: [{}], message: e.message})
    });
  }

  return (
    <div >
      <h4 className="title">My Properties</h4>
      {data.properties && data.properties.length ? (
        data.properties.map((p, index) => (
          <div>
            <PropertyItem property={p} key={index}/>
            <br />
          </div>
        ))
      ) : (
        <div >
          <span>
            No properties found!
          </span>
        </div>
      )}
    </div>
  );
};

export default MyProperties;