import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Location from '../components/Location'
import Temp from '../components/Temp'
import Button from '../components/Button'
import UpdateForm from '../components/UpdateForm'
import SettingsCheckbox from '../components/SettingsCheckbox'

import '../../index.css'

class App extends Component {
  constructor() {
    super()
    const savedScale = localStorage.getItem('scale')

    this.state = {
      currentLocation: {},
      city: undefined,
      temp: 0,
      // celsius: this.setScale(savedScale),
      searchTerm: '',
      defaultSettings: !!savedScale,
      loading: true,
      scale: savedScale ? savedScale : 'C'
    }
  }

  componentDidMount() {
    const defaultCity = localStorage.getItem('city')
    
    if (!!defaultCity){
      this.getNewLocation(defaultCity)
    } else {
      this.getNewLocation('london')
    }
  }

  // Returns the user's scale setting if saved. Defaults to celsius (true) if settings are not saved
  setScale = (savedScale) => {
    switch (savedScale) {
      case 'F':
        return false
      case 'C':
        return true
      default:
        return true
    }
  }

  // Event handler when the user searches for a new location
  updateLocation = () => {
    this.getNewLocation(this.state.searchTerm)
  }

  // Event handles the fecth request to the backend with the location term
  getNewLocation = (location) => {
    fetch(`http://localhost:3000/weather/${location}`)
      .then(res => res.json())
      .then(this.handleLocationChange)
  }

  // Event handler for saving user's settings
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
    localStorage.setItem('scale', this.state.scale)
  }

  removeSettings = () => {
    localStorage.removeItem('city')
    localStorage.removeItem('celsius')
    localStorage.removeItem('scale')
  }

  handleLocationChange = res => {
    if (!!res.weather) {
      this.setState({ 
        currentLocation: res,
        city: res.name,
        temp: res.main.temp,
        searchTerm: '',
        loading: false
      })
    }
  }

  getTemp = temp => {
    if (this.state.scale === 'C') {
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
    const newScale = this.state.scale === 'C' ? 'F' : 'C'

    if (this.state.defaultSettings) {
      localStorage.setItem('celsius', !this.state.celsius)
      localStorage.setItem('scale', newScale)
    }

    this.setState({ scale: newScale })
  }

  changeSearch = e => {
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    const { city, temp, defaultSettings, searchTerm } = this.state

    return (
      <div id='app'>
        { this.state.loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Location name={ city }/>
            <Temp temp={ this.getTemp(temp)} scale={ this.state.scale }/>
            <Button handleClick={ this.changeScale } scale={ this.state.scale === 'F' ? 'fahrenheit' : 'celsius' } />
            <SettingsCheckbox checked={ defaultSettings } handleChange={this.handleSettings} />
            <UpdateForm searchTerm={ searchTerm } handleChange={ this.changeSearch } handleClick={ this.updateLocation } />

            <i className="material-icons">cloud</i>
            <i className="material-icons">favorite</i>
            <i className="material-icons">attachment</i>
            <i className="material-icons">computer</i>
            <i className="material-icons">traffic</i>
          </>
        )}
      </div>
    )
  }
}

export default hot(module)(App)