import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { checkUserId } from '@/entities/user/api'
import { JWT } from 'next-auth/jwt'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // 가입 여부 확인
    async signIn({ account }) {
      console.log('app/api/auth/signIn account', account)
      console.log('app/api/auth/signIn account?.provider', account?.provider)
      if (account?.provider === 'google') {
        return true
      }
      return false
    },
    // id_token 저장
    async jwt({ token, account }) {
      console.log('app/api/auth/jwt token', token)
      console.log('app/api/auth/jwt account', account)
      if (account) {
        token.idToken = account.id_token
      }
      return token
    },
    // id_token 세션에 저장
    async session({ session, token }) {
      const typedToken = token as JWT
      if (typeof typedToken.idToken === 'string') {
        session.idToken = typedToken.idToken
      } else {
        session.idToken = undefined
      }

      console.log('app/api/auth/session session', session)
      console.log('app/api/auth/session token', token)

      return session
    },
  },
  pages: {
    // signIn error 발생 시 이동할 커스텀 에러 페이지 경로
    error: '/auth/error',
  },
})

export { handler as GET, handler as POST }
