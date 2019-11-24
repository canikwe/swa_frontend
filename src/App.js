import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import '../index.css'


class App extends Component {

  state = {
    currentWeather: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/weather/london')
    .then(res => res.json())
    .then(this.updateWeather)
  }

  updateWeather = currentWeather => {
    if (!!currentWeather.weather) {
      this.setState({ currentWeather })
    }
  }

  render() {
    return (
      <div className='App'>
        <h1>The Fucking Weather</h1>
      </div>
    )
  }
}

export default hot(module)(App)