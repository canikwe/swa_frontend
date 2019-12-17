import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Location from '../components/Location'
import Temp from '../components/Temp'
import Rating from '../components/Rating'
import Button from '../components/Button'
import UpdateForm from '../components/UpdateForm'
import SettingsCheckbox from '../components/SettingsCheckbox'
import LocationList from '../components/LocationList'

import '../../index.css'

class App extends Component {
  constructor() {
    super()
    const savedScale = localStorage.getItem('scale')

    this.state = {
      currentLocation: {},
      city: undefined,
      temp: 0,
      searchTerm: '',
      defaultSettings: !!savedScale,
      loading: true,
      scale: savedScale ? savedScale : 'C',
      locations: []
    }
  }

  componentDidMount() {
    const defaultCity = localStorage.getItem('city')
    
    if (!!defaultCity){
      this.getNewLocation({type: 'location', query: defaultCity})
    } else {
      this.getNewLocation({type: 'location', query, location: 'london'})
    }
  }

  // Event handler when the user searches for a new location
  searchLocations = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/search/${this.state.searchTerm}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 1) {
        this.getNewLocation({location: this.state.searchTerm})
      } else {
        this.setState({locations: data})
      }
    })
  }

  // Event handles the fecth request to the backend with the location term
  getNewLocation = (data) => {
    // fetch(`http://localhost:3000/weather/${location}`)
    //   .then(res => res.json())
    //   .then(this.handleLocationChange)
    
    fetch(`http://localhost:3000/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
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
    localStorage.setItem('scale', this.state.scale)
  }

  removeSettings = () => {
    localStorage.removeItem('city')
    localStorage.removeItem('scale')
  }

  handleLocationChange = res => {
    if (!!res.weather) {
      this.setState({ 
        currentLocation: res,
        city: res.name,
        temp: res.main.temp,
        searchTerm: '',
        loading: false,
        locations: []
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

  getRating = () => {
    return this.state.temp >= 285.15 ? "It's fucking hot." : "It's fucking cold."
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
            <Rating cold={ this.getRating() } />
            <Button handleClick={ this.changeScale } scale={ this.state.scale === 'C' ? 'fahrenheit' : 'celsius' } />
            <SettingsCheckbox checked={ defaultSettings } handleChange={this.handleSettings} />
            <UpdateForm searchTerm={ searchTerm } handleChange={ this.changeSearch } handleClick={ this.searchLocations } />
            {this.state.locations.length > 0 ? 
              <LocationList locations={this.state.locations} handleClick={this.getNewLocation} /> : null
            }
          </>
        )}
      </div>
    )
  }
}

export default hot(module)(App)