import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const { id } = req.query.id

  const movies = await prisma.favorite.findMany({
    where: {
      userUuid: id
    }
  })

  res.status(200).json(movies)
}
