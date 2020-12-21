const fs = require('fs')
const express = require('express')
const app = express()
const parser = require("body-parser")
const router = express.Router()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(parser.json())

let films = [];

fs.readFile('./films.json', 'utf-8', (err, data) => {
 films = JSON.parse(data)
})

app.get('/', (req, res) => {
  res.send(films)
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
