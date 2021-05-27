import React, { useState } from "react";
import PropertyItem from "./propertyItem";
import { listProperty } from "../actions/properties";
import { useDispatch } from "react-redux";

const PropertyList = () => {

  const dispatch = useDispatch();

  const intialValues = {
    properties: [],
    message: ""
  }
  const [data, setData] = useState(intialValues);

  if (data.properties.length === 0) {
    dispatch(listProperty())
    .then(res => { 
      setData({ properties: res, message: "Request has been processed successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }
  
  return (
    <>
      <div >
        <div>
          <h4 className="title">Properties</h4>
        </div>
      </div>
      <br />
      <div>
        <div >
          {data.properties && data.properties.length ? (
            data.properties.map((property, index) => (
              <PropertyItem
              property={property}
              key={index}
              />
            ))
          ) : (
            <div >
              <span>
                No properties found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyList;