import React from "react";
import Tilt from 'react-tilt';
import './Title.css';
import icon from './game_icon.png';

const Title = () => {
  return(
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 250, width: 250 }} >
        <div className="Tilt-inner tc"><img src={icon} alt='logo'></img></div>
      </Tilt>
    </div>
  )
}

export default Title;
