const coldDesc = [
  'Someone get me a fucking blanket',
  'blerg',
]

const hotDesc = [
  "I'm sweating bullets here"
]

const randSample = (array) => {
  const max = array.length
  const randIndex = Math.floor(Math.random() * Math.floor(max))
  return array[randIndex]
}

export const forecasts = {
  hot: {
    msg: "It's fucking hot.",
    description: randSample(hotDesc)
  },
  cold: {
    msg: "It's fucking cold",
    description: randSample(coldDesc)
  }
}
