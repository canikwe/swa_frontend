import React, { useState, useEffect } from 'react'

import Location from '../components/Location'
import Weather from '../components/Weather'
import Forcast from '../components/Forcast'
import Button from '../components/Button'
import UpdateForm from '../components/UpdateForm'
import SettingsButton from '../components/SettingsButton'
import LocationList from '../components/LocationList'

import { forcasts } from '../helper/forcasts'

const App = () => {

// ----------------------- Set up initial state -----------------------

  const [loading, updateLoading] = useState(true)
  // const [searchTerm, updateSearchTerm] = useState('')
  // const [error, updateError] = useState(undefined)
  // const [locations, updateLocations] = useState([])

  const [search, updateSearch] = useState({ locations: [], term: '', errors: null })

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
    handleLocationUpdate(location)
    getWeather({ type: 'coord', query: location.geometry })
  }

  const handleLocationUpdate = location => {
    const { components, geometry } = location
    let city
    if (components.city) {
      city = components.city
    } else if (components.village) {
      city = components.village
    } else if (components.hamlet) {
      city = components.hamlet
    } else if (components.state_district) {
      city = components.state_district
    } else if (components.suburb){
      city = components.suburb
    } else if (components.county) {
      city = components.county
    } else {
      city = '' 
    }

    updateLocation({ city , state: components.state, coord: geometry })
  }

  const changeScale = () => {
    const newScale = settings.scale === 'C' ? 'F' : 'C'

    if (settings.saved) localStorage.setItem('scale', newScale)

    updateSettings({ ...settings, scale: newScale })
  }

  const changeSearch = e => {
    // updateSearchTerm(e.target.value)
    updateSearch({ ...search, term: e.target.value })
  }

  const resetSearch = () => {
    // updateError(undefined)
    // updateLocations([])
    // updateSearchTerm('')

    updateSearch({ locations: [], term: '', errors: null })
  }

// ----------------------- Async callback/helper functions -----------------------

  const searchLocations = e => {
    e.preventDefault()
    
    fetch(`http://localhost:3000/search/${search.term}`)
    .then(res => res.json())
    .then(data => {
      switch (data.length) {
        case 0:
          updateSearch({ ...search, errors: "I can't find your fucking location!" })
          break
        case 1:
          const location = data[0]
          handleLocationSelect(location)
          break
        default:
          updateSearch({ ...search, locations: data })
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
      console.log(data)
      
      updateWeather({ temp: data.main.temp, description: data.weather[0].description, icon: data.weather[0].icon }) // DRY THIS UP!
      updateLoading(false)
      if (search.term !== '') resetSearch()
    })
    .catch(err => {
      console.log(err.message)
      // updateError(err.message)
      updateSearch({ ...search, errors: err.message })
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
    localStorage.setItem('city', location.city)
    localStorage.setItem('state', location.state)
    localStorage.setItem('lat', location.coord.lat)
    localStorage.setItem('lng', location.coord.lng)

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

  const calculateForcast = () => {
    const { temp } = weather
    let condition
    if (temp > 285.15) {
      condition = 'hot'
    } else if (temp < 285.15) {
      condition = 'cold'
    }
    return forcasts[condition]
  }

// ----------------------- Loading App and it's children -----------------------

  console.log(loading, weather.temp)

  if (loading) {
    return <h1>Loading...</h1>
  } else {
    const { scale } = settings
    const { city, state } = location
    const { term: searchTerm, errors, locations } = search
    const { description, icon } = weather

    return (
      <div id='app'>
        <Location city={ city } state={ state }/>
        <Weather temp={ getTemp() } scale={ scale } description={ description } icon={ icon }/>
        <Forcast forcast={ calculateForcast() } />
        <Button handleClick={ changeScale } scale={ scale === 'C' ? 'fahrenheit' : 'celsius' } />
        { renderSettingsBtn() }
        <UpdateForm searchTerm={ searchTerm } handleChange={ changeSearch } handleClick={ searchLocations } />
        { locations.length > 0 ? 
          <LocationList locations={ locations } handleSelect={ handleLocationSelect } /> : null
        }
        { errors ? <h2>{ errors }</h2> : null }
      </div>
    )
  }
}

export default App