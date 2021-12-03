import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    })
  ],
  callbacks: {
    async session({ session }) {
      try {
        const userExists = await prisma.user.findFirst({
          where: {
            email: session.user.email
          }
        })

        if (userExists) {
          return {
            ...session.user,
            uuid: userExists.uuid
          }
        }

        return session
      } catch {
        return session
      }
    },
    async signIn({ user }) {
      const { name, email, image } = user

      try {
        const userExists = await prisma.user.findFirst({
          where: {
            email: user.email
          }
        })

        if (!userExists) {
          await prisma.user.create({
            data: {
              name: name,
              email: email,
              avatar: image
            }
          })
        }
        return true
      } catch {
        return false
      }
    }
  }
})
