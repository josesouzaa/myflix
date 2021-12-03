import { tmdb } from '../../services/api'
import { PrismaClient } from '.prisma/client'

export default async (req, res) => {
  const prisma = new PrismaClient()

  const { movie, user } = req.query
  const response = await tmdb.get(
    `/search/movie?api_key=${process.env.API_KEY}&query=${movie}`
  )
  const movies = response.data.results

  try {
    if (user) {
      const moviesFavoriteds = await prisma.favorite.findMany({
        where: {
          userUuid: user
        },
        select: {
          id: true
        }
      })

      const favoriteds = moviesFavoriteds.map((movie) => movie.id)

      const filtredMovies = movies.map((movie) => {
        if (favoriteds.includes(movie.id)) {
          return { ...movie, isFavorite: true }
        } else {
          return { ...movie, isFavorite: false }
        }
      })

      res.status(200).json(filtredMovies)
    }
  } catch {
    res.status(200).json(movies)
  }
}
