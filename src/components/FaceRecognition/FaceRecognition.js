import React from 'react'
const FaceRecognition = ({ imageUrl }) => {

  let imgAlt = '';
  if (imageUrl.length > 0) {
    imgAlt = 'your image'
  }

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imageUrl} alt={imgAlt} width='500px' height='auto' />
      </div>
    </div>
  );
};

export default FaceRecognition;