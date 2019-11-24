import React from 'react'

const Button = props => {
  return (
  <button onClick={ props.handleClick }> I want fucking { props.scale }</button>
  )
}

export default Button