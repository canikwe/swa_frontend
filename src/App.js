import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Location from './Location'
import Temp from './Temp'

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
    const { currentLocation } = this.state

    return (
      <div className='App'>
        <Location name={ currentLocation.name }/>
        <Temp temp={ currentLocation.main ?  currentLocation.main.temp : 'Loading...'}/>
      </div>
    )
  }
}

export default hot(module)(App)