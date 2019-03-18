import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = () => {
  return (
    <div>
      <p className="f3 tc">
        {
          "This magic brane will detect faces in your pictures. Give it a try."
        }
      </p>
      <div className="center form">
        <div className='pa4 br3 shadow-5 w-100'>
          <input className="f4 pa2 w-70" type="text" />
          <button className="w-30 grow f4 link ph3 pv2 did white bg-light-purple">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;