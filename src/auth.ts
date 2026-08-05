import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { login } from "./lib/api/auth";

type User = {
  id: string;
  email: string;
  password: string;
};

// auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig.callbacks, // keep your `authorized` callback
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: { type: "password" } },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        const response = await login({
          email: credentials.email.toString(),
          password: credentials.password.toString(),
        });
        if (!response?.user) return null;
        return {
          id: response.user.id.toString(),
          email: response.user.email,
          name: response.user.name,
          accessToken: response.token,
        };
      },
    }),
  ],
});