import React, { useState, useEffect } from 'react'

import Loading from '../components/Loading'
import Header from '../components/Header'
import Weather from '../components/Weather'
import Forecast from '../components/Forecast'
import SearchBar from '../components/SearchBar'
import Settings from '../components/Settings'
import LocationsList from './LocationsList'
import Error from '../components/Error'
import { forecasts } from '../helper/forecasts'

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/'

const App = () => {

// ----------------------- Set up initial state -----------------------

  const [loading, updateLoading] = useState(true)
  const [search, updateSearch] = useState({ toggle: false, locations: [], term: '', error: null })
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

    let state
    if (components.state){
      state = components.state
    } else {
      state = components.country
    }

    updateLocation({ city , state, coord: geometry })
  }

  const changeScale = e => {
    
    const newScale = e.target.id

    if (settings.saved) localStorage.setItem('scale', newScale)

    updateSettings({ ...settings, scale: newScale })
  }

  const changeSearch = e => {
    updateSearch({ ...search, term: e.target.value })
  }

  const resetSearch = () => {
    updateSearch({ toggle: false, locations: [], term: '', error: null })
  }

  const toggleSearch = () => {
    updateSearch({ ...search, toggle: true, term: `${location.city}, ${location.state}` })
  }

// ----------------------- Async callback/helper functions -----------------------


  const searchLocations = e => {
    e.preventDefault()
    updateLoading(true)

    const strippedTerm = search.term.replace(/[^\w\s]/gi, '')
    
    fetch(`${BASE_URL}search/${strippedTerm}`)
    .then(res => res.json())
    .then(data => {
      updateLoading(false)
      switch (data.length) {
        case 0:
          updateSearch({ ...search, locations: [], error: "I can't find your fucking location!" })
          break
        case 1:
          const location = data[0]
          handleLocationSelect(location)
          resetSearch()
          break
        default:
          updateSearch({ ...search, error: null, locations: data })
          break
      }
    })
  }

  const getWeather = search => {
    updateLoading(true)
    
    fetch(`${BASE_URL}weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(search)
    })
    .then(res => res.json())
    .then(data => {
      
      updateWeather({ temp: data.main.temp, description: data.weather[0].description, icon: data.weather[0].icon }) // DRY THIS UP!
      updateLoading(false)
      if (search.term !== '') resetSearch()
    })
    .catch(err => {
      updateLoading(false)
      updateSearch({ ...search, error: err.message })
    })
  }

// ----------------------- Helper functions -----------------------

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

  const calculateForecast = () => {
    const { temp } = weather
    let condition
    if (temp > 285.15) {
      condition = 'hot'
    } else if (temp < 285.15) {
      condition = 'cold'
    }
    return forecasts[condition]
  }

// ----------------------- Loading App and it's children -----------------------

  if (loading) {
    return <Loading />
  } else {
    const { scale, saved } = settings
    const { city, state } = location
    const { toggle: searchToggle, term: searchTerm, error, locations } = search
    const { description, icon } = weather

    return (
      <div id='app'>
        {
          searchToggle ? 
            <SearchBar 
              searchTerm={searchTerm} 
              handleBackNav={resetSearch} 
              handleChange={changeSearch} 
              handleSearch={searchLocations}
            />
              :
            <Header 
              city={city} 
              state={state} 
              handleToggle={toggleSearch}
            />
        }

        { !locations.length && !error ?
        <>
          <Weather 
            temp={getTemp()} 
            scale={scale} 
            description={description} 
            icon={icon}
          />
          <Forecast 
            forecast={calculateForecast()} 
          />
          <Settings 
            handleSave={saved ? removeSettings : saveSettings} 
            saved={saved}
            handleScale={changeScale}
            scale={scale}
          />
        </> : null
        }
        
        { locations.length ? 
          <LocationsList 
            locations={locations} 
            handleSelect={handleLocationSelect} 
          /> : null
        }
        { error ? 
          <Error 
            error={error} 
          /> : null 
        }
      </div>
    )
  }
}

export default App