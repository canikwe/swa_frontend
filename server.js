// import express from 'express'
// import path from 'path'

const express = require('express')
const path = require('path')

const port = process.env.PORT || 3001
const app = express()
const publicPath = path.join(__dirname, 'public')


// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'))
//   })
  
// app.get('/', (req, res) => res.send('Hello from Express!'))

app.use(express.static('public'))
  
app.listen(port, () => {
  console.log(`server is up on ${port}!`)
})
