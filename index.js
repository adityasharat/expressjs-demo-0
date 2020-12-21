const fs = require('fs')
const express = require('express')
const app = express()
const parser = require("body-parser")
const router = express.Router()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(parser.json())

app.get('/', (req, res) => {
  read((error, films) => {
    if (!error) {
      res.send(films)
    } else {
      res.status(500).send({
        error: error.message
      })
    }
  })
})

app.post('/', (req, res) => {
  console.log(JSON.stringify(req.body, null, 2))
  read((error, films) => {
    if (!error) {
      films.push(req.body)
        write(films, (error) => {
          if (!error) {
          res.send(films)
        } else {
          res.status(500).send({
            error: error.message
          })
        }
     })
    } else {
      res.status(500).send({
        error: error.message
      })
    }
  })
})

app.delete('/:index', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

function read(done) {
  fs.readFile('./films.json', (error, data) => {
    done(error, !error ? JSON.parse(data): '[]')
  })
}

function write(films, done) {
  fs.writeFile('./films.json', JSON.stringify(films, null, 2), (error) => {
    done(error)
  })
}
