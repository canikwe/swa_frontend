import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Location from './Location'

import '../index.css'


class App extends Component {

  state = {
    currentLocation: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/weather/london')
    .then(res => res.json())
    .then(this.updateWeather)
  }

  updateWeather = currentLocation => {
    if (!!currentLocation.weather) {
      this.setState({ currentLocation })
    }
  }



  render() {
    const { name } = this.state.currentLocation

    return (
      <div className='App'>
        <Location name={ name }/>
      </div>
    )
  }
}

export default hot(module)(App)