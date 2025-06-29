import NextAuth, { CredentialsSignin } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { User } from './models/UserModel';
import { compare } from 'bcryptjs';
export const { auth, handlers, signIn, signOut } = NextAuth({
  // connect to db
  // custom page for login and signup

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!password || !username)
          throw new CredentialsSignin('Please provide username and password');
        // todo: connect to db
        const user = await User.findOne({ username }).select('+password');
        if (!user.password)
          throw new CredentialsSignin('Invalid username or password');
        const matched = await compare(password, user.password);
        if (!matched)
          throw new CredentialsSignin('Invalid username or password');
        return {
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
          id: user._id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
});
