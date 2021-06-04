import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { Container, Row, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import PropertyItem from "./propertyItem";
import { deactivateProperty, deleteProperty, listProperty, buyProperty, UpdateApprovalStatus } from "../actions/properties";
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

  // Property Listing page
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
    window.location.reload();
  }

  // Delete button click fire API and show message as a toaster
  const onClickDelete = (property) => {
    handleDelete(property)
    notify(data.message)
    setData({...data, message: ""})
    // To refresh component
    window.location.reload();
    
  }

  // Buy button click fire API and show message as a toaster
  const onClickBuy = (property) => {
    handleBuy(property)
    notify(data.message)
    setData({...data, message: ""})
    // To refresh component
    window.location.reload();
  }

  // Approve/Reject button click fire API and show message as a toaster
  const onClickUpdateApprovalStatus = (property, is_approved) => {
    handleApprovalStatus(property, is_approved)
    notify(data.message)
    setData({...data, message: ""})
    // To refresh component
    window.location.reload();
  }

  // Deactivate property API
  const handleDeactivation = (property) => {
    dispatch(deactivateProperty(property.id))
    .then(res => { 
      setData({ ...data, message: property.name + " activation status has been updated successfully" });
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

  // Approve/Reject property API
  const handleApprovalStatus = (property, is_approved) => {
    dispatch(UpdateApprovalStatus(property.id, is_approved))
    .then(res => { 
      setData({ ...data, message: property.name + " approval status has been updated successfully" }); 
    })
    .catch(e => {
      console.log(e.message);
      setData({...data, message: e.message})
    });
  }

  // Disable button for user and admin role
  const isButtonDisable = () => {
    return (localStorage.currentUserRole === 'super_admin')
  }

  // Add property button render to add page
  const onClickAddProperty = () => {
    props.history.push("/panel/addProperty")
  }

  // Update property button click render to update page
  const onClickUpdateProperty = (p) => {
    props.history.push("/panel/updateProperty", p)
  }

  // Buy button should be enable for user only
  const isBuyButtonDisable = () => {
    return (localStorage.currentUserRole === 'user')
  }

  // Approval status button should be enable for admin/owner only
  const isApprovalButtonEnable = () => {
    return (localStorage.currentUserRole === 'admin')
  }
  
  return (
    <div>
      <h2 className="title">Properties</h2>
      <br /><br />
      <Container>
        <Row>
          {data.properties && data.properties.length ? (
            data.properties.map((p, index) => (
              <Col xs="4">
                <div>
                  <Box>
                    <PropertyItem property={p} key={index}/>
                    { isButtonDisable() && <button onClick={() => {onClickDeactivate(p)}}>{p.is_active ? "Deactivate" : "Activate"}</button> }&nbsp;&nbsp;
                    { isButtonDisable() && <button onClick={() => {onClickDelete(p)}}>Delete</button> }&nbsp;
                    { isBuyButtonDisable() && <button children = "buy property" onClick={() => {onClickBuy(p)}} />}&nbsp;
                    { isButtonDisable() && p && <button onClick={() => { onClickUpdateProperty(p)}}>Edit</button>}&nbsp;
                    <br />
                    { isApprovalButtonEnable() && <button children = "Approve" disabled={p.is_approved} onClick={() => onClickUpdateApprovalStatus(p, true)} /> }&nbsp;&nbsp;
                    { isApprovalButtonEnable() && <button children = "Reject" disabled={!p.is_approved} onClick={() => onClickUpdateApprovalStatus(p, false)} /> }&nbsp;
                  </Box>
                  <br /><br />
                </div>
              </Col>
            ))
          ) : (
            <div >
              <span>
                .....Loading!!!
              </span>
            </div>
          )}
        </Row>
      </Container>
      { data.properties.length && isButtonDisable() &&
        <button children = "Add new property" onClick={onClickAddProperty} /> 
      }
    </div>
  );
};

const Box = props => <div className="box">{props.children} </div>;

export default withRouter(PropertyList);
