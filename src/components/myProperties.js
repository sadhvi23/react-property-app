import React, { useState } from "react";
import { Container, Row, Col} from "react-bootstrap";

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
      <h2 className="title">My Properties</h2>
      <br /><br />
      <Container>
        <Row>
          {data.properties && data.properties.length ? (
            data.properties.map((p, index) => (
              <Col xs="4">
                <div>
                  <Box>
                    <PropertyItem property={p} key={index}/>
                  </Box>
                  <br />
                </div>
              </Col>
            ))
          ) : (
            <div >
              <span>
                No properties found!
              </span>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

const Box = props => <div className="box">{props.children} </div>;

export default MyProperties;