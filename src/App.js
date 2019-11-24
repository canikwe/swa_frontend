import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Location from './Location'
import Temp from './Temp'
import Button from './Button'

import '../index.css'


class App extends Component {

  state = {
    currentLocation: {},
    celsius: true
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

  getTemp = temp => {
    if (this.state.celsius) {
      return this.celsiusConvert(temp)
    } else {
      return this.fahrenheitConvert(temp)
    }
  }

  celsiusConvert = temp => {
    return Math.round(temp - 273)
  }

  fahrenheitConvert = temp => {
    return Math.round(temp * (9/5) - 459.67)
  }

  changeScale = () => {
    this.setState({ celsius: !this.state.celsius })
  }


  render() {
    const { currentLocation } = this.state

    return (
      <div className='App'>
        <Location name={ currentLocation.name }/>
        <Temp temp={ currentLocation.main ?  this.getTemp(currentLocation.main.temp) : 'Loading...'}/>
        <Button handleClick={this.changeScale} scale={this.state.celsius ? 'fahrenheit' : 'celsius'}/>
      </div>
    )
  }
}

export default hot(module)(App)