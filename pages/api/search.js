import { tmdb } from '../../services/api'

export default async (req, res) => {
  const movie = req.query.movie
  const response = await tmdb.get(
    `/search/movie?api_key=${process.env.API_KEY}&query=${movie}`
  )
  const movies = response.data.results
  res.status(200).json(movies)
}
