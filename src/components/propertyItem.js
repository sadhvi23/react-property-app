import React from "react";

const PropertyItem = props => {
  const { property } = props;
  return (
    <div className="inner">
      <div>
      <div><b>{property.name} </b> <label className="status-label">{property.is_approved ? "Approved" : "Rejected"}</label>
        
      </div>
        <figure>
          <img
            src="https://compressjpeg.com/images/compressjpeg/icon.png"
            alt={property.name}
          />
        </figure>
      </div>
    </div>
  );
};

export default PropertyItem;
