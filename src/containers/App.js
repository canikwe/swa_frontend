import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Location from '../components/Location'
import Temp from '../components/Temp'
import Button from '../components/Button'
import UpdateForm from '../components/UpdateForm'

class App extends Component {

  state = {
    currentLocation: {},
    city: undefined,
    temp: 0,
    celsius: true,
    searchTerm: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/weather/london')
    .then(res => res.json())
    .then(this.updateLocation)
  }

  updateLocation = res => {
    if (!!res.weather) {
      this.setState({ 
        currentLocation: res,
        city: res.name,
        temp: res.main.temp,
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

  changeSearch = e => {
    this.setState({ searchTerm: e.target.value })
  }

  getNewLocation = () => {
    fetch(`http://localhost:3000/weather/${this.state.searchTerm}`)
    .then(res => res.json())
    .then(this.updateLocation)
  }


  render() {
    const { city, temp, searchTerm } = this.state

    return (
      <div className='App'>
        <Location name={ city }/>
        <Temp temp={ this.getTemp(temp) }/>
        <Button handleClick={ this.changeScale } scale={ this.state.celsius ? 'fahrenheit' : 'celsius' }/>
        <hr />
        <UpdateForm searchTerm={ searchTerm } handleChange={ this.changeSearch } handleClick={ this.getNewLocation }/>
      </div>
    )
  }
}

export default hot(module)(App)