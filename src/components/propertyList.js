import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import PropertyItem from "./propertyItem";
import { deactivateProperty, deleteProperty, listProperty, buyProperty} from "../actions/properties";
import { useDispatch } from "react-redux";
import notify from "../helpers/notify";

const PropertyList = (props) => {

  const dispatch = useDispatch();

  const intialValues = {
    properties: [],
    message: "",
    editMode: false
  }
  const [data, setData] = useState(intialValues);

  if (data.properties && data.properties.length === 0) {
    dispatch(listProperty())
    .then(res => { 
      setData({ ...data, properties: res, message: "Request has been processed successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, properties: [{}], message: e.message})
    });
  }

  // Deactivate button click fire API and show message as a toaster
  const onClickDeactivate = (property) => {
    handleDeactivation(property)
    notify(data.message)
  }

  // Delete button click fire API and show message as a toaster
  const onClickDelete = (property) => {
    handleDelete(property)
    notify(data.message)
  }

  // Buy button click fire API and show message as a toaster
  const onClickBuy = (property) => {
    handleBuy(property)
    notify(data.message)
  }

  // Deactivate property API
  const handleDeactivation = (property) => {
    dispatch(deactivateProperty(property.id))
    .then(res => { 
      setData({ ...data, message: property.name + " has been deactivated successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }

  // Delete property API
  const handleDelete = (property) => {
    dispatch(deleteProperty(property.id))
    .then(res => { 
      setData({ ...data, message: property.name + " has been deleted successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }

  // Buy property API
  const handleBuy = (property) => {
    dispatch(buyProperty(property.id))
    .then(res => { 
      setData({ ...data, message: property.name + " has been bought successfully" });
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }

  const isButtonDisable = () => {
    return !(localStorage.currentUserRole === 'super_admin')
  }

  const onClickAddProperty = () => {
    props.history.push("/panel/addProperty")
  }

  const onClickUpdateProperty = (p) => {
    props.history.push("/panel/updateProperty", p)
  }
  
  return (
    <div className="outer">
      <h4 className="title">Properties</h4>
      {data.properties && data.properties.length ? (
        data.properties.map((p, index) => (
          <div>
            <PropertyItem property={p} key={index}/>
            { !isButtonDisable() && <button onClick={() => {onClickDeactivate(p)}}>Deactivate</button> }&nbsp;&nbsp;
            { !isButtonDisable() && <button onClick={() => {onClickDelete(p)}}>Delete</button> }&nbsp;
            { isButtonDisable() && <button children = "buy property" onClick={() => {onClickBuy(p)}} />}&nbsp;
            {!isButtonDisable() && p && <button onClick={() => { onClickUpdateProperty(p)}}>Edit</button>}&nbsp;
            <br /><br />
          </div>
        ))
      ) : (
        <div >
          <span>
            No properties found!
          </span>
        </div>
      )}
      { !isButtonDisable() &&
        <button children = "Add new property" onClick={onClickAddProperty} /> 
      }
    </div>
  );
};

export default withRouter(PropertyList);