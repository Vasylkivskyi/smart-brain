import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box, facesCoordinates }) => {
  let imgAlt = "";
  if (imageUrl.length > 0) {
    imgAlt = "your image";
  }

  const boundingBoxes = facesCoordinates.map((box, id) => {
    return (
      <div
        className="bounding-box"
        style={{
          top: box.topRow,
          bottom: box.bottomRow,
          left: box.leftCol,
          right: box.rightCol
        }}
      />
    )
  })


  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImg"
          src={imageUrl}
          alt={imgAlt}
          width="500px"
          height="auto"
        />
        {/* <div
          className="bounding-box"
          style={{
            top: box.topRow,
            bottom: box.bottomRow,
            left: box.leftCol,
            right: box.rightCol
          }}
        /> */}
        {boundingBoxes}
      </div>
    </div>
  );
};

export default FaceRecognition;
