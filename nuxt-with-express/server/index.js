const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Express GET endpoint
  const axios = require('axios')
  let movieIndex = 0
  app.get('/api/next-movie', async (req, res, next) => {
    const movieOptions = [
      'tt3896198',
      'tt0071253',
      'tt0109686',
      'tt2267998',
      'tt0109040',
      'tt0089218'
    ]
    const movie = await axios.get(
      `https://www.omdbapi.com/?i=${movieOptions[movieIndex]}&apikey=9733f1df`
    )
    movieIndex++
    if (movieIndex > movieOptions.length - 1) movieIndex = 0
    res.json(movie.data)
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
