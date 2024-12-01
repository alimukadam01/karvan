import React from 'react'
import '../batchDisplay/BatchDisplay.css'

function BatchDisplay(props) {
  return (
    <div className='container-fluid' id='batch-display-container'>
      <h2>{props.batch_no}</h2>
      <h1>{props.name}</h1>
      <div className='batch-images-container'>
        {props.images.map((image, index) => (
          <div className='batch-image'>
            <img src={image} alt="/" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BatchDisplay;