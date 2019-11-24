import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Location from './Location'
import Temp from './Temp'
import Button from './Button'

import '../index.css'


class App extends Component {

  state = {
    currentLocation: {},
    city: '',
    temp: 0,
    celsius: true
  }

  componentDidMount() {
    fetch('http://localhost:3000/weather/london')
    .then(res => res.json())
    .then(this.updateWeather)
  }

  updateWeather = res => {
    if (!!res.weather) {
      this.setState({ 
        currentLocation: res,
        city: res.name,
        temp: res.main.temp
      })
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
    const { currentLocation, city, temp } = this.state

    return (
      <div className='App'>
        <Location name={ city }/>
        <Temp temp={ this.getTemp(temp) }/>
        <Button handleClick={this.changeScale} scale={this.state.celsius ? 'fahrenheit' : 'celsius'}/>
      </div>
    )
  }
}

export default hot(module)(App)