import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Password Only',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Environment Password:', process.env.APP_PASSWORD);

        if (!credentials || !credentials.password) {
          return null;
        }
        const validPassword = process.env.APP_PASSWORD;
        console.log('Input Password:', credentials.password);
        console.log('ENV pass', validPassword);
        if (String(credentials.password) === String(validPassword)) {
          const user = {
            id: '1',
            name: 'Authorized User',
          };

          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 3600,
    updateAge: 600,
  },
});

export { handler as GET, handler as POST };
