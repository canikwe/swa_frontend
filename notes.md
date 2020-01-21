# Project Plan

## Component Hierarchy

+ App
  ✅ Header { city, state, handleToggle + def props: 'The Fucking Weather' }
  // { searchToggle ? }
  ✅ SearchBar { searchTerm, handleChange, handleBackNav, handleSearch, city, state }
  ✅ Weather { ...weather, scale }
  + Forecast { forecast }
  + SettingsBtn {  scale, handleToggle }
  // { locationList.length !== 0 ?}
  + LocationsList { locations, handleSelect }
    + Location { location, handleSelect }
  // { error ? }
  + Error { error }

## Initial State

```javascript
  const loading = true // overall loading of the app
  const search = {
    toggle: false,
    locations: [],
    term: '',
    errors: null
  }
  const settings = {
    scale: 'C',
    saved: false
  }
  const weather = {
    temp: 0,
    description: '',
    icon: ''
  }
  const location = {
    city: 'London',
    state: 'England',
    coord: {
      lat: 51.5074,
      lng: 0.1278
    }
  }
```

## Routes

N/A
