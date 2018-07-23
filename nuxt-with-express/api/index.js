const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
  res.send('API root')
})

app.get('/random-movie', async (req, res, next) => {
  const axios = require('axios')
  const movieOptions = [
    'tt3896198',
    'tt0071253',
    'tt0109686',
    'tt2267998',
    'tt0109040',
    'tt0089218'
  ]
  const movieID = movieOptions[Math.floor(Math.random() * movieOptions.length)]
  const movie = await axios.get(
    `https://www.omdbapi.com/?i=${movieID}&apikey=9733f1df`
  )
  res.json(movie.data)
})

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
