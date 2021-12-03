import axios from 'axios'

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})
