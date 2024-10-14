import React from 'react'

function Button(props) {
  return (
    <div className={props.className}>{props.text}</div>
  )
}

export default Button