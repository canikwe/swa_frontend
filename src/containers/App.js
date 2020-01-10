import React, { useState, useEffect } from 'react'

import Location from '../components/Location'
import Temp from '../components/Temp'
import Rating from '../components/Rating'
import Button from '../components/Button'
import UpdateForm from '../components/UpdateForm'
import SettingsButton from '../components/SettingsButton'
import LocationList from '../components/LocationList'

const App = () => {

// ----------------------- Set up initial state -----------------------

  const [loading, updateLoading] = useState(true)
  const [searchTerm, updateSearchTerm] = useState('')
  const [error, updateError] = useState(undefined)
  const [locations, updateLocations] = useState([])


  const [settings, updateSettings] = useState({ scale: 'C', saved: false })
  const [weather, updateWeather] = useState({ temp: 0, description: '', icon: '' })
  const [location, updateLocation] = useState({ city: 'London', state: 'England', coord: {lat: 51.5074, lng: 0.1278} })

// ----------------------- Effect to fire when component first mounts -----------------------
  useEffect(() => {
    
    const city = localStorage.getItem('city')

     if (!!city){
      const state = localStorage.getItem('state')
      const scale = localStorage.getItem('scale')
      const lat = localStorage.getItem('lat')
      const lng = localStorage.getItem('lng')

      updateSettings({ scale, saved: true })
      updateLocation({ city, state, coord: {lng, lat} })
      getWeather({ type: 'coord', query: { lat, lng } })
    } else {
      getWeather({type: 'coord', query: location.coord })
    }
  }, [])
  
// ----------------------- State changing helper methods -----------------------

  const handleLocationSelect = location => {
    updateLocation({ city: location.components.city, state: location.components.state, coord: location.geometry })
    getWeather({ type: 'coord', query: location.geometry })
  }

  const changeScale = () => {
    const newScale = settings.scale === 'C' ? 'F' : 'C'

    if (settings.saved) localStorage.setItem('scale', newScale)

    updateSettings({ ...settings, scale: newScale })
  }

  const changeSearch = e => {
    updateSearchTerm(e.target.value)
  }

  const resetSearch = () => {
    updateError(undefined)
    updateLocations([])
    updateSearchTerm('')
  }

// ----------------------- Async callback/helper functions -----------------------

  const searchLocations = e => {
    e.preventDefault()

    fetch(`http://localhost:3000/search/${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      switch (data.length) {
        case 0:
          updateError("I can't find your fucking location!")
          break
        case 1:
          const location = data[0]
          const search = {type: 'coord', query: location.geometry}
          
          updateLocation({ city: location.components.city, state: location.components.state, coord: location.geometry })
          getWeather(search)
          break
        default:
          updateLocations(data)
          break
      }
    })
  }

  const getWeather = search => {
    
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
      //`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      console.log(data)
      
      updateWeather({ temp: data.main.temp, description: data.weather[0].description, icon: data.weather[0].icon })
      updateLoading(false)
      if (searchTerm !== '') resetSearch()
    })
    .catch(err => {
      console.log(err.message)
      updateError(err.message)
    })
  }

// ----------------------- Helper functions -----------------------

  // Renders different settings buttons depending on whether or not the user has chosen to save their settings
  const renderSettingsBtn = () => {
    if (settings.saved) {
      return (
        <>
          <SettingsButton text="Update My Fucking Settings" handleChange={saveSettings} />
          <SettingsButton text="Forget My Fucking Settings" handleChange={removeSettings} />
        </>
      )
    } else {
      return <SettingsButton text="Save My Fucking Settings" handleChange={saveSettings} />
    }
  }

  // localStorage/settings helper functions
  const saveSettings = () => {
    localStorage.setItem('scale', settings.scale)
    localStorage.setItem('city', settings.city)
    localStorage.setItem('state', settings.state)
    localStorage.setItem('lat', settings.coord.lat)
    localStorage.setItem('lng', settings.coord.lng)

    updateSettings({ ...settings, saved: true })
  }

  const removeSettings = () => {
    localStorage.removeItem('scale')
    localStorage.removeItem('city')
    localStorage.removeItem('state')
    localStorage.removeItem('lat')
    localStorage.removeItem('lng')

    updateSettings({ ...settings, saved: false })
  }

  // Temperature helper functions
  const getTemp = () => {
    if (settings.scale === 'C') {
      return celsiusConvert()
    } else {
      return fahrenheitConvert()
    }
  }

  const celsiusConvert = () => {
    return Math.round(weather.temp - 273)
  }

  const fahrenheitConvert = () => {
    return Math.round(weather.temp * (9/5) - 459.67)
  }

  const weatherMessage = () => {
    return weather.temp >= 285.15 ? "It's fucking hot." : "It's fucking cold."
  }

// ----------------------- Loading App and it's children -----------------------

  console.log(loading, weather.temp)

  if (loading) {
    return <h1>Loading...</h1>
  } else {
    const { scale } = settings
    const { city, state } = location
    return (
      <div id='app'>
        <Location city={ city } state={ state }/>
        <Temp temp={ getTemp() } scale={ scale }/>
        <Rating cold={ weatherMessage() } />
        <Button handleClick={ changeScale } scale={ scale === 'C' ? 'fahrenheit' : 'celsius' } />
        { renderSettingsBtn() }
        <UpdateForm searchTerm={ searchTerm } handleChange={ changeSearch } handleClick={ searchLocations } />
        { locations.length > 0 ? 
          <LocationList locations={ locations } handleSelect={ handleLocationSelect } /> : null
        }
        { error ? <h2>{ error }</h2> : null }
      </div>
    )
  }
}

export default App