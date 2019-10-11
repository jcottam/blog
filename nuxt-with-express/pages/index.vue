<template>
  <section class="container">
    <h1>
      <a
        href="https://medium.com/@johnryancottam/running-nuxt-in-parallel-with-express-ffbd1feef83c"
        target="_blank"
        >Running NUXT in parallel with Express</a
      >
    </h1>
    <div v-if="movie" class="movie">
      <img :src="movie.Poster" />
      <h2>{{ movie.Title }}</h2>
      <h3>{{ movie.Year }}</h3>
    </div>
    <button @click="getNextMovie">Get Next Movie</button>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  asyncData({ params, error }) {
    return axios.get('http://localhost:3000/api/next-movie').then((res) => {
      return { movie: res.data }
    })
  },
  methods: {
    getNextMovie() {
      return axios.get('http://localhost:3000/api/next-movie').then((res) => {
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

button {
  margin-top: 15px;
  cursor: pointer;
}
</style>
