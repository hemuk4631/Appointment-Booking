import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./models/UserModel";
import { compare } from "bcryptjs";
import { connectDB } from '@/lib/mongodb';
import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectDB();
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!username || !password) {
          throw new CredentialsSignin("Please provide username and password");
        }

        const user = await User.findOne({ username }).select("+password");
        if (!user?.password) {
          throw new CredentialsSignin("Invalid username or password");
        }

        const matched = await compare(password, user.password);
        if (!matched) {
          throw new CredentialsSignin("Invalid username or password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
});

