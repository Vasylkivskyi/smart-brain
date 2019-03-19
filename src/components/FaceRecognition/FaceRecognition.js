import React from 'react'
const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma3">
      <img src={imageUrl} alt="image" />
    </div>
  );
};

export default FaceRecognition;