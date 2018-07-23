<template>
  <section class="container">
      <div class="movie" v-if="movie">
        <img :src="movie.Poster">
        <h1>{{movie.Title}}</h1>
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
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: sans-serif;
}

.movie img {
  width: 300px;
  height: 445px;
}

.movie h1 {
  margin-top: 5px;
}

.movie button {
  margin-top: 15px;
  cursor: pointer;
}
</style>
