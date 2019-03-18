import React from 'react';
import Tilt from "react-tilt";
import './logo.css';
import brane from './brain.png'

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow-2 tc" options={{ max: 25 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa3"><img src={brane} alt="logo"/></div>
      </Tilt>
    </div>
  );
}

export default Logo;