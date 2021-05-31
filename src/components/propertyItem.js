import React from "react";

const PropertyItem = props => {
  const { property } = props;
  return (
    <div className="media">
      <div className="media-left">
      <div><b>{property.name}</b></div>
        <figure className="image is-64x64">
          <img
            src="https://compressjpeg.com/images/compressjpeg/icon.png"
            alt={property.name}
          />
        </figure>
      </div>
      <div className="media-content">
        <b style={{ textTransform: "capitalize" }}>
          <span className="tag is-primary">This is sample property</span>
        </b>
      </div>
    </div>
  );
};

export default PropertyItem;