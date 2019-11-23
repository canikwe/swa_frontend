document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded!')
  const submit = document.querySelector('#weatherForm')
  const tempBtn = document.querySelector('#change-temp')

  submit.addEventListener('submit', fetchWeather)
  tempBtn.addEventListener('click', changeTemp)
})

const toCelsius = kelvinTemp => Math.round(kelvinTemp - 273.15)

const toFarenheit = fahrenheitTemp => Math.round((fahrenheitTemp * 9/5) + 32)

const changeTemp = e => {
  const temp = document.querySelector('#weather')

  temp.innerText = `${toFarenheit(parseInt(temp.innerText))} °F`
}

const fetchWeather = e => {
  e.preventDefault()
  const form = document.querySelector('form')

  fetch(`http://localhost:3000/weather`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {type: 'location', query: form.location.value} )
  })
  .then(res => res.json())
  .then(res => {
    addResult(res)
    form.reset()
  })
  .catch(console.log)
}

const addResult = data => {
  const div = document.querySelector('div')
  const result = document.createElement('h2')
  const remark = document.createElement('h3')

  result.innerText = `${toCelsius(data.main.temp)} °C`
  result.id = 'weather'
  remark.innerText = "It's fucking cold!"

  div.append(result, remark)
}
