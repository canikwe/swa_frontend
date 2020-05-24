const express = require('express')

const port = process.env.PORT || 3001
const app = express()

// serving static files from the dist directory
app.use(express.static('dist'))

// handle 404 responses for routes outside '/' and '/index.html'
app.use((req, res) => res.status(404).send("Sorry I can't find that!"))

// error handling
app.use((err, req, res) => {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`server is up on ${port}!`)
})
