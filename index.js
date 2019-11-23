document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded!')
  const submit = document.querySelector('#weatherForm')
  submit.addEventListener('submit', e => {
    e.preventDefault()

    fetch(`http://localhost:3000/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {type: 'location', query: 'London'} )
    })
    .then(res => res.json())
    .then(addResult)
    .catch(console.log)
  })
})

const addResult = data => {
  const div = document.querySelector('div')
  const result = document.createElement('h2')
  const remark = document.createElement('h3')

  result.innerText = `${toCelsius(data.main.temp)} degrees C`
  result.id = 'weather'
  remark.innerText = "It's fucking cold!"

  div.append(result, remark)
}

const toCelsius = kelvinTemp => Math.round(kelvinTemp - 273.15)