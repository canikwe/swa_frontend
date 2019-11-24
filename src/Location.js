import React from 'react'

const Location = props => {
  return (
    <h1>{ props.name }</h1>
  )
}

Location.defaultProps = {
  name: 'The Fucking Weather'
}

export default Location