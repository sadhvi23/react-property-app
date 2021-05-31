import React, { useState } from "react";

import PropertyItem from "./propertyItem";
import { deactivateProperty, deleteProperty, listProperty, buyProperty} from "../actions/properties";
import { useDispatch } from "react-redux";
import AddProperty from "./AddProperty"
import notify from "../helpers/notify";
import AddOwnerProperty from "./addOwnerProperty"

const PropertyList = () => {

  const dispatch = useDispatch();

  const intialValues = {
    properties: [],
    message: "",
    editMode: false,
    addOwnerMode: false
  }
  const [data, setData] = useState(intialValues);
  const [property, setProperty] = useState({key: 0});

  if (data.properties.length === 0) {
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
    // To refresh component
    window.location.reload(false);
  }

  // Buy button click fire API and show message as a toaster
  const onClickBuy = (property) => {
    handleBuy(property)
    notify(data.message)
  }

  // Add Owner button click fire API and show message as a toaster
  const onClickAddOwner = (p) => {
    setData({...data, addOwnerMode: true})
    setProperty({...property, key: p.id})
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

  // Set edit mode as true and key as item id when click on update button
  const handleUpdate = (p) => {
    setData({...data, editMode: true})
    setProperty({...property, key: p.id})
  }

  const isButtonDisable = () => {
    if (localStorage.currentUserRole === 'super_admin') {
      return false
    } else {
      return true
    }
  }
  
  return (
    <div >
      <h4 className="title">Properties</h4>
      {data.properties && data.properties.length ? (
        data.properties.map((p, index) => (
          <div>
            <PropertyItem property={p} key={index}/>
            <button onClick={() => {onClickDeactivate(p)}} disabled={isButtonDisable()}>Inactive</button>&nbsp;
            <button onClick={() => {onClickDelete(p)}} disabled={isButtonDisable()}>Delete</button>&nbsp;
            <button onClick={() => {onClickBuy(p)}} disabled={isButtonDisable()}>Buy</button>&nbsp;
            {p && <button onClick={() => { handleUpdate(p)}} disabled={isButtonDisable()}>Edit</button>}&nbsp;
            {property.key === p.id && data.editMode && <AddProperty editMode={data.editMode} propertyData={p} />}
            <button onClick={() => {onClickAddOwner(p)}} disabled={isButtonDisable()}>AddOwner</button>&nbsp;
            {property.key === p.id && <AddOwnerProperty property={p} />}
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
    </div>
  );
};

export default PropertyList;