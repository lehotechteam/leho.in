import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { parseValidAccounts } from './app/lib/auth-accounts';

export const authOptions = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString();

        if (!email || !password) {
          return null;
        }

        const validAccounts = parseValidAccounts(process.env.VALID_ACCOUNTS);
        const validPassword = validAccounts.get(email);

        if (validPassword && validPassword === password) {
          return {
            id: email,
            email,
            name: email,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = typeof token.id === 'string' ? token.id : undefined;
        session.user.email = typeof token.email === 'string' ? token.email : session.user.email;
      }

      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
