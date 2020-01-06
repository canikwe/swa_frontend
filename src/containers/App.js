import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'

import Location from '../components/Location'
import Temp from '../components/Temp'
import Rating from '../components/Rating'
import Button from '../components/Button'
import UpdateForm from '../components/UpdateForm'
import SettingsButton from '../components/SettingsButton'
import LocationList from '../components/LocationList'

import '../../index.css'

const App = () => {

  const [temp, updateTemp] = useState(0)
  const [loading, updateLoading] = useState(true)
  const [city, updateCity] = useState(undefined)
  const [state, updateState] = useState(undefined)

  useEffect(() => {
    const defaultCity = localStorage.getItem('city')
    const defaultState = localStorage.getItem('state')
    const lat = localStorage.getItem('lat')
    const lng = localStorage.getItem('lng')

     if (!!defaultCity){
       updateCity(defaultCity)
       updateState(defaultState)
       getWeather({type: 'coord', query: { lat, lng }})
    } else {
      setLocation('London','England')
      getWeather({type: 'location', query: 'london'})
    }

  }, [])


  // ----------------------  Class State Syntax  --------------------------------
  
  // constructor() {
  //   super()
  //   const savedScale = localStorage.getItem('scale')

  //   this.state = {
  //     currentLocation: {},
  //     city: undefined,
  //     temp: 0,
  //     searchTerm: '',
  //     defaultSettings: !!savedScale,
  //     loading: true,
  //     scale: savedScale ? savedScale : 'C',
  //     locations: [],
  //     coord: {}
  //   }
  // }

  // componentDidMount() {
  //   const defaultCity = localStorage.getItem('city')
  //   const defaultState = localStorage.getItem('state')
  //   const lat = localStorage.getItem('lat')
  //   const lng = localStorage.getItem('lng')
    
  //   if (!!defaultCity){
  //     this.setLocation(defaultCity, defaultState)
  //     this.getWeather({type: 'coord', query: { lat, lng }})
  //   } else {
  //     this.setLocation('London','England')
  //     this.getWeather({type: 'location', query: 'london'})
  //   }
  // }

  // Event handler when the user searches for a new location
  // const searchLocations = e => {
  //   e.preventDefault()
  //   fetch(`http://localhost:3000/search/${this.state.searchTerm}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     if (data.length === 0) {
  //       this.setState({error: "I can't find your fucking location!"})
  //     } else if (data.length === 1) {
  //       const location = data[0]
  //       const search = {type: 'coord', query: location.geometry}
  //       this.getWeather(search)
  //       this.setLocation(location.components.city, location.components.state)
  //     } else {
  //       this.setState({locations: data})
  //     }
  //   })
  // }

  
  const setLocation = (city, state) => {
    updateCity(city)
    updateState(state)
  }

  // Event handles the fecth request to the backend
  const getWeather = (search, location) => {
    
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
      if (location) setLocation(location.components.city, location.components.state)
      // updateWeather(data)
      updateTemp(data.main.temp)
      updateLoading(false)
    })
  }

  // const updateWeather = res => {
  //   console.log(res)
  //   if (!!res.weather) {
  //     this.setState({ 
  //       currentLocation: res,
  //       // city: res.name,
  //       temp: res.main.temp,
  //       searchTerm: '',
  //       loading: false,
  //       locations: [],
  //       coord: res.coord,
  //       error: undefined
  //     })
  //   }
  // }

  // Renders different settings buttons depending on whether or not the user has chosen to save their settings
  // const renderSettingsBtn = () => {
  //   if (this.state.defaultSettings) {
  //     return (
  //       <>
  //         <SettingsButton text="Update My Fucking Settings" handleChange={this.saveSettings} />
  //         <SettingsButton text="Remove My Fucking Settings" handleChange={this.removeSettings} />
  //       </>
  //     )
  //   } else {
  //     return <SettingsButton text="Save My Fucking Settings" handleChange={this.saveSettings} />
  //   }
  // }

  // const saveSettings = () => {
  //   localStorage.setItem('city', this.state.city)
  //   localStorage.setItem('scale', this.state.scale)
  //   localStorage.setItem('lat', this.state.coord.lat)
  //   localStorage.setItem('lng', this.state.coord.lon)   
  //   localStorage.setItem('state', this.state.state)

  //   this.setState({ defaultSettings: true })
  // }

  // const removeSettings = () => {
  //   localStorage.removeItem('city')
  //   localStorage.removeItem('scale')
  //   localStorage.removeItem('coord')
  //   localStorage.removeItem('state')
  //   localStorage.removeItem('lat')
  //   localStorage.removeItem('lng')

  //   this.setState({ defaultSettings: false })
  // }

  // const getTemp = temp => {
  //   if (this.state.scale === 'C') {
  //     return this.celsiusConvert(temp)
  //   } else {
  //     return this.fahrenheitConvert(temp)
  //   }
  // }

  const celsiusConvert = temp => {
    return Math.round(temp - 273)
  }

  const fahrenheitConvert = temp => {
    return Math.round(temp * (9/5) - 459.67)
  }

  // const changeScale = () => {
  //   const newScale = this.state.scale === 'C' ? 'F' : 'C'

  //   if (this.state.defaultSettings) {
  //     localStorage.setItem('celsius', !this.state.celsius)
  //     localStorage.setItem('scale', newScale)
  //   }

  //   this.setState({ scale: newScale })
  // }

  // const changeSearch = e => {
  //   this.setState({ searchTerm: e.target.value })
  // }

  // const getRating = () => {
  //   return this.state.temp >= 285.15 ? "It's fucking hot." : "It's fucking cold."
  // }

  console.log(loading, temp)
  // const { city, state, temp, defaultSettings, searchTerm } = this.state
  return (
    <div id='app'>
      { loading ? (
        <h1>The temp is not { temp } .. Loading...</h1>
      ) : (
        <>
        { null }
          <Location city={ city } state={ state }/>
          {/* <Temp temp={ this.getTemp(temp)} scale={ this.state.scale }/>
          <Rating cold={ this.getRating() } />
          <Button handleClick={ this.changeScale } scale={ this.state.scale === 'C' ? 'fahrenheit' : 'celsius' } />
          { this.renderSettingsBtn() }
          <UpdateForm searchTerm={ searchTerm } handleChange={ this.changeSearch } handleClick={ this.searchLocations } />
          {this.state.locations.length > 0 ? 
            <LocationList locations={this.state.locations} handleClick={this.getWeather} /> : null
          }
          {this.state.error ? <h2>{this.state.error}</h2> : null} */}
        </>
      )}
    </div>
  )
  
}

// export default hot(module)(App)
export default App