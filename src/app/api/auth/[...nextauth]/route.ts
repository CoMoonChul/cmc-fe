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
    async signIn({ user }) {
      const email = user.email
      if (!email) {
        console.error('구글 회원 정보 로드에 실패했습니다.')
        return false
      }
      const googleUserId = `google_${email.split('@')[0]}`
      const res = await checkUserId(googleUserId)
      if (res.resultMessage?.includes('USER007')) {
        return true
      }
      return false
    },
    // id_token 저장
    async jwt({ token, account }) {
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

      return session
    },
  },
})

export { handler as GET, handler as POST }
