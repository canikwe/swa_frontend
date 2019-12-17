import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Location from '../components/Location'
import Temp from '../components/Temp'
import Rating from '../components/Rating'
import Button from '../components/Button'
import UpdateForm from '../components/UpdateForm'
import SettingsButton from '../components/SettingsButton'
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
      locations: [],
      coord: {}
    }
  }

  componentDidMount() {
    const defaultCity = localStorage.getItem('city')
    const defaultState = localStorage.getItem('state')
    const lat = localStorage.getItem('lat')
    const lng = localStorage.getItem('lng')
    
    if (!!defaultCity){
      this.setLocation(defaultCity, defaultState)
      this.getWeather({type: 'coord', query: { lat, lng }})
    } else {
      this.setLocation('London','England')
      this.getWeather({type: 'location', query: 'london'})
    }
  }

  // Event handler when the user searches for a new location
  searchLocations = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/search/${this.state.searchTerm}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        this.setState({error: "I can't find your fucking location!"})
      } else if (data.length === 1) {
        const location = data[0]
        const search = {type: 'coord', query: location.geometry}
        this.getWeather(search)
        this.setLocation(location.components.city, location.components.state)
      } else {
        this.setState({locations: data})
      }
    })
  }

  
  setLocation = (city, state) => {
    this.setState({ city, state })
  }

  // Event handles the fecth request to the backend
  getWeather = (search, location) => {
    
    fetch(`http://localhost:3000/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(search)
    })
    .then(res => res.json())
    .then(data => {
      if (location) this.setLocation(location.components.city, location.components.state)
      this.updateWeather(data)
    })
  }

  updateWeather = res => {
    console.log(res)
    if (!!res.weather) {
      this.setState({ 
        currentLocation: res,
        // city: res.name,
        temp: res.main.temp,
        searchTerm: '',
        loading: false,
        locations: [],
        coord: res.coord,
        error: undefined
      })
    }
  }

  // Renders different settings buttons depending on whether or not the user has chosen to save their settings
  renderSettingsBtn = () => {
    if (this.state.defaultSettings) {
      return (
        <>
          <SettingsButton text="Update My Fucking Settings" handleChange={this.saveSettings} />
          <SettingsButton text="Remove My Fucking Settings" handleChange={this.removeSettings} />
        </>
      )
    } else {
      return <SettingsButton text="Save My Fucking Settings" handleChange={this.saveSettings} />
    }
  }

  saveSettings = () => {
    localStorage.setItem('city', this.state.city)
    localStorage.setItem('scale', this.state.scale)
    localStorage.setItem('lat', this.state.coord.lat)
    localStorage.setItem('lng', this.state.coord.lon)   
    localStorage.setItem('state', this.state.state)

    this.setState({ defaultSettings: true })
  }

  removeSettings = () => {
    localStorage.removeItem('city')
    localStorage.removeItem('scale')
    localStorage.removeItem('coord')
    localStorage.removeItem('state')
    localStorage.removeItem('lat')
    localStorage.removeItem('lng')

    this.setState({ defaultSettings: false })
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
    const { city, state, temp, defaultSettings, searchTerm } = this.state

    return (
      <div id='app'>
        { this.state.loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Location city={ city } state={ state }/>
            <Temp temp={ this.getTemp(temp)} scale={ this.state.scale }/>
            <Rating cold={ this.getRating() } />
            <Button handleClick={ this.changeScale } scale={ this.state.scale === 'C' ? 'fahrenheit' : 'celsius' } />
            { this.renderSettingsBtn() }
            <UpdateForm searchTerm={ searchTerm } handleChange={ this.changeSearch } handleClick={ this.searchLocations } />
            {this.state.locations.length > 0 ? 
              <LocationList locations={this.state.locations} handleClick={this.getWeather} /> : null
            }
            {this.state.error ? <h2>{this.state.error}</h2> : null}
          </>
        )}
      </div>
    )
  }
}

export default hot(module)(App)