import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  const id = req.params

  const user = await prisma.user.findFirst({
    where: {
      uuid: id
    }
  })

  res.status(200).json(user)
}
