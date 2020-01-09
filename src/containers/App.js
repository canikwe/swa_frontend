import React, { useState, useEffect } from 'react'

import Location from '../components/Location'
import Temp from '../components/Temp'
import Rating from '../components/Rating'
import Button from '../components/Button'
import UpdateForm from '../components/UpdateForm'
import SettingsButton from '../components/SettingsButton'
import LocationList from '../components/LocationList'

import '../../index.css'

const App = () => {

// ----------------------- Set up initial state -----------------------

  const [temp, updateTemp] = useState(0)
  const [loading, updateLoading] = useState(true)
  // const [city, updateCity] = useState('London')
  // const [state, updateState] = useState('England')
  // const [scale, updateScale] = useState('C')
  // const [lat, updateLat] = useState(51.5074)
  // const [lng, updateLng] = useState(0.1278)
  const [searchTerm, updateSearchTerm] = useState('')
  const [error, updateError] = useState(undefined)
  const [locations, updateLocations] = useState([])
  
  // settings object
  const [settings, updateSettings] = useState(
    { city: 'London', state: 'England', scale: 'C', coord: {lat: 51.5074, lng: 0.1278}, saved: false }
    )

// ----------------------- Effect to fire when component first mounts -----------------------
  useEffect(() => {
    const city = localStorage.getItem('city')
    // const defaultState = localStorage.getItem('state')
    // const defaultScale = localStorage.getItem('scale')
    // const defaultLat = localStorage.getItem('lat')
    // const defaultLng = localStorage.getItem('lng')

     if (!!city){
       
       // updateScale(defaultScale)
       // updateLat(defaultLat)
       // updateLng(defaultLng)

       //settings obj
      //  const city = localStorage.getItem('city')
      const state = localStorage.getItem('state')
      const scale = localStorage.getItem('scale')
      const lat = localStorage.getItem('lat')
      const lng = localStorage.getItem('lng')

      setLocation(city, state)
      
      
      updateSettings({ city, state, scale, lat, lng, saved: true })
      getWeather({type: 'coord', query: { lat: defaultLat, lng: defaultLng }})

    } else {
      getWeather({type: 'coord', query: settings.coord })
    }

  }, [])
  
// ----------------------- State changing helper methods -----------------------

  const setLocation = (city, state) => {
    updateCity(city)
    updateState(state)

    updateSettings({ ...settings, city, state })
  }

  const handleLocationSelect = (location) => {
    setLocation(location.components.city, location.components.state)
    getWeather({ type: 'coord', query: location.geometry })
  }

  const changeScale = () => {
    const newScale = settings.scale === 'C' ? 'F' : 'C'

    if (settings.saved) {
      localStorage.setItem('scale', newScale)
    }

    // updateScale(newScale)

    updateSettings({ ...settings, scale: newScale })
  }

  const changeSearch = e => {
    updateSearchTerm(e.target.value)
  }

// ----------------------- Async callback/helper functions -----------------------

  const searchLocations = e => {
    e.preventDefault()
    fetch(`http://localhost:3000/search/${searchTerm}`)
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        updateError("I can't find your fucking location!")
      } else if (data.length === 1) {
        const location = data[0]
        const search = {type: 'coord', query: location.geometry}
        
        setLocation(location.components.city, location.components.state)
        getWeather(search)
      } else {
        updateLocations( data )
      }
    })
  }

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
      updateTemp(data.main.temp)
      updateLoading(false)
      updateError(undefined)
      updateLocations([])
      updateSearchTerm('')
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

  const saveSettings = () => { // Make this a single object
    localStorage.setItem('scale', scale)
    localStorage.setItem('city', city)
    localStorage.setItem('state', state)
    localStorage.setItem('lat', lat)
    localStorage.setItem('lng', lng)
  }

  const removeSettings = () => {
    localStorage.removeItem('scale')
    localStorage.removeItem('city')
    localStorage.removeItem('state')
    localStorage.removeItem('lat')
    localStorage.removeItem('lng')
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
    return Math.round(temp - 273)
  }

  const fahrenheitConvert = () => {
    return Math.round(temp * (9/5) - 459.67)
  }

  const weatherMessage = () => {
    return temp >= 285.15 ? "It's fucking hot." : "It's fucking cold."
  }

  console.log(loading, temp)
  if (loading) {
    return <h1>Loading...</h1>
  } else {
    const { city, state, scale } = settings
    return (
      <div id='app'>

          <>
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
          </>
    </div>
        )
  }
  
  
}

export default App