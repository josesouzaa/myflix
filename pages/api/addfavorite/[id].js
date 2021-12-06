import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const { user, id } = req.query
  const { movie } = req.body

  const movieIsFavorite = await prisma.favorite.findFirst({
    where: {
      id: Number(id),
      userUuid: user
    }
  })

  const isAuthenticated = await prisma.user.findFirst({
    where: {
      uuid: user
    }
  })

  try {
    if (!movieIsFavorite && isAuthenticated) {
      const addFavorite = await prisma.favorite.create({
        data: {
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path,
          overview: movie.overview,
          userUuid: user
        }
      })
      res.status(200).json(addFavorite)
    }

    if (movieIsFavorite && isAuthenticated) {
      const removeFavorite = await prisma.favorite.delete({
        where: {
          uuid: movieIsFavorite.uuid
        }
      })
      res.status(200).json(removeFavorite)
    }
  } catch {
    res.status(200)
  }
}
