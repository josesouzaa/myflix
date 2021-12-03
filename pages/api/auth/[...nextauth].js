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
    async signIn({ profile }) {
      const { id, login, name, email, html_url, avatar_url, bio } = profile

      try {
        const userExists = await prisma.user.findFirst({
          where: {
            id: id
          }
        })

        if (!userExists) {
          await prisma.user.create({
            data: {
              id: id,
              login: login,
              name: name,
              email: email,
              html_url: html_url,
              avatar_url: avatar_url,
              bio: bio
            }
          })
        }
        return true
      } catch {
        return false
      }
    },
    redirect({ url, baseUrl }) {
      if (url.includes('user')) return baseUrl
      return url
    }
  }
})
