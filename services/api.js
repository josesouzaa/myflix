import axios from 'axios'

export const tmdb = axios.create({
  baseURL: process.env.URL_TMDB
})

export const api = axios.create({
  baseURL: 'https://myflixapp.vercel.app/api'
})
