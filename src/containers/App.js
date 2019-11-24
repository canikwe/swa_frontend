import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Location from '../components/Location'
import Temp from '../components/Temp'
import Button from '../components/Button'
import UpdateForm from '../components/UpdateForm'
import SettingsCheckbox from '../components/SettingsCheckbox'

class App extends Component {
  constructor() {
    super()
    const defaultScale = localStorage.getItem('celsius')

    this.state = {
      currentLocation: {},
      city: undefined,
      temp: 0,
      celsius: !!defaultScale ? defaultScale: true,
      searchTerm: '',
      defaultSettings: !!defaultScale
    }
  }

  componentDidMount() {
    const defaultCity = localStorage.getItem('city')
    if (!!defaultCity){
      fetch(`http://localhost:3000/weather/${defaultCity}`)
      .then(res => res.json())
      .then(this.updateLocation)
    } else {
      fetch('http://localhost:3000/weather/london')
      .then(res => res.json())
      .then(this.updateLocation)
    }
  }

  getNewLocation = () => {
    fetch(`http://localhost:3000/weather/${this.state.searchTerm}`)
      .then(res => res.json())
      .then(this.updateLocation)
  }

  handleSettings = () => {
    
    if (this.state.defaultSettings) {
      this.removeSettings()
    } else {
      this.saveSettings()
    }
    this.setState({ defaultSettings: !this.state.defaultSettings })
  }

  saveSettings = () => {
    localStorage.setItem('city', this.state.city)
    localStorage.setItem('celsius', this.state.celsius)
  }

  removeSettings = () => {
    localStorage.removeItem('city')
    localStorage.removeItem('celsius')
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

  render() {
    const { city, temp, defaultSettings, searchTerm } = this.state

    return (
      <div className='App'>
        <Location name={ city }/>
        <Temp temp={ this.getTemp(temp) }/>
        <Button handleClick={ this.changeScale } scale={ this.state.celsius ? 'fahrenheit' : 'celsius' }/>
        <hr />
        <SettingsCheckbox checked={defaultSettings} handleChange={this.handleSettings} />
        <UpdateForm searchTerm={ searchTerm } handleChange={ this.changeSearch } handleClick={ this.getNewLocation }/>
      </div>
    )
  }
}

export default hot(module)(App)