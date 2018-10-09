import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonChange}) => {
  return(
    <div >
      <p className='f3'>
        Monocuma Will detect faces in your pictures, submit the link to see it!
      </p>
      <div className='center'>
        <div className='form center pa4 w-70 br3 shadow-5'>
          <input className='pa2 f4 center w-70' type='text' onChange={onInputChange}></input>
          <button className='w-30 grow f4 link ph3 pv2 dib bn white bg-light-purple' onClick={onButtonChange}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;
