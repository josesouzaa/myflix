import { tmdb } from '../../services/api'

export default async (req, res) => {
  const response = await tmdb.get(
    `/trending/movie/week?api_key=${process.env.API_KEY}`
  )
  const movies = response.data.results
  res.status(200).json(movies)
}
