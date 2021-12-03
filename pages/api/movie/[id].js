import { tmdb } from '../../../services/api'

export default async (req, res) => {
  const id = req.query.id
  const response = await tmdb.get(`/movie/${id}?api_key=${process.env.API_KEY}`)
  const movie = response.data
  res.status(200).json(movie)
}
