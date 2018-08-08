<template>
  <section class="container">
    <h1><a href="https://medium.com/@johnryancottam/running-nuxt-in-parallel-with-express-ffbd1feef83c" target="_blank">Running NUXT in parallel with Express</a></h1>
      <div class="movie" v-if="movie">
        <img :src="movie.Poster">
        <h2>{{movie.Title}}</h2>
        <h3>{{movie.Year}}</h3>
        <button @click="getRandomMovie">Get Random Movie</button>
      </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  asyncData({ params }) {
    return axios.get(`http://localhost:3000/api/random-movie`).then(res => {
      return { movie: res.data }
    })
  },
  methods: {
    getRandomMovie() {
      axios.get(`api/random-movie`).then(res => {
        this.movie = res.data
      })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: sans-serif;
}

h1 {
  margin-bottom: 20px;
}
.movie img {
  width: 300px;
  height: 445px;
}

.movie h2 {
  margin-top: 5px;
}

.movie button {
  margin-top: 15px;
  cursor: pointer;
}
</style>
