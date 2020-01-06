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
  const [scale, updateScale] = useState('C')
  const [lat, updateLat] = useState(0)
  const [lon, updateLon] = useState(0)
  const [searchTerm, updateSearchTerm] = useState('')
  const [error, updateError] = useState(undefined)
  const [locations, updateLocations] = useState([])

  useEffect(() => {
    const defaultCity = localStorage.getItem('city')
    const defaultState = localStorage.getItem('state')
    const defaultScale = localStorage.getItem('scale')
    const lat = localStorage.getItem('lat')
    const lng = localStorage.getItem('lng')

     if (!!defaultCity){
       updateCity(defaultCity)
       updateState(defaultState)
       updateScale(defaultScale)
       updateLat(lat)
       updateLon(lng)
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
        getWeather(search)
        setLocation(location.components.city, location.components.state)
      } else {
        updateLocations( data )
      }
    })
  }

  
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
      updateError(undefined)
      updateLocations([])
      updateCity(data.name)
      updateSearchTerm('')
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
  const renderSettingsBtn = () => {
    if (localStorage.getItem('scale')) {
      return (
        <>
          <SettingsButton text="Update My Fucking Settings" handleChange={saveSettings} />
          <SettingsButton text="Remove My Fucking Settings" handleChange={removeSettings} />
        </>
      )
    } else {
      return <SettingsButton text="Save My Fucking Settings" handleChange={saveSettings} />
    }
  }

  const saveSettings = () => {
    localStorage.setItem('city', city)
    localStorage.setItem('scale', scale)
    localStorage.setItem('lat', lat)
    localStorage.setItem('lng', lon)   
    localStorage.setItem('state', state)

    // this.setState({ defaultSettings: true })
  }

  const removeSettings = () => {
    localStorage.removeItem('city')
    localStorage.removeItem('scale')
    localStorage.removeItem('coord')
    localStorage.removeItem('state')
    localStorage.removeItem('lat')
    localStorage.removeItem('lng')

    // this.setState({ defaultSettings: false })
  }

  const getTemp = () => {
    if (scale === 'C') {
      return celsiusConvert(temp)
    } else {
      return fahrenheitConvert(temp)
    }
  }

  const celsiusConvert = temp => {
    return Math.round(temp - 273)
  }

  const fahrenheitConvert = temp => {
    return Math.round(temp * (9/5) - 459.67)
  }

  const changeScale = () => {
    const newScale = scale === 'C' ? 'F' : 'C'

    if (localStorage.getItem('scale')) {
      // localStorage.setItem('celsius', !this.state.celsius)
      localStorage.setItem('scale', newScale)
    }

    updateScale(newScale)
  }

  const changeSearch = e => {
    updateSearchTerm(e.target.value)
  }

  const getRating = () => {
    return temp >= 285.15 ? "It's fucking hot." : "It's fucking cold."
  }

  console.log(loading, temp)
  // const { city, state, temp, defaultSettings, searchTerm } = this.state
  return (
    <div id='app'>
      { loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Location city={ city } state={ state }/>
          <Temp temp={ getTemp()} scale={ scale }/>
          <Rating cold={ getRating() } />
          <Button handleClick={ changeScale } scale={ scale === 'C' ? 'fahrenheit' : 'celsius' } />
          { renderSettingsBtn() }
          <UpdateForm searchTerm={ searchTerm } handleChange={ changeSearch } handleClick={ searchLocations } />
            {locations.length > 0 ? 
            <LocationList locations={locations} handleClick={getWeather} /> : null
          }
          {error ? <h2>{error}</h2> : null}
        </>
      )}
    </div>
  )
  
}

// export default hot(module)(App)
export default App