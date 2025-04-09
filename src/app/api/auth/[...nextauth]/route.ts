import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { checkUserId } from '@/entities/user/api'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const email = user.email
      if (!email) {
        console.error('구글 회원 정보 로드에 실패했습니다.')
        return false
      }
      const googleUserId = `google_${email.split('@')[0]}`
      const res = await checkUserId(googleUserId)
      const idToken = account?.id_token
      console.log('구글 id_token', idToken)

      if (res.resultMessage?.includes('USER007')) {
        return true
      }
      return false
    },
  },
})

export { handler as GET, handler as POST }
