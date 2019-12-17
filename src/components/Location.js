import React from 'react'

const Location = props => {
  return (
    <h4>{ props.city }, { props.state }</h4>
  )
}

Location.defaultProps = {
  name: 'The Fucking Weather'
}

export default Location