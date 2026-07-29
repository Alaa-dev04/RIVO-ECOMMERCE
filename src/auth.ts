import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

type User = {
  id: string;
  email: string;
  password: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {
            type: "password"
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const user = await getUserByEmail(email as string);
        if (!user) return null;
        const passwordsMatch = await comparePasswords(
          password as string,
          user.password,
        );

        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
});
async function getUserByEmail(email: string): Promise<User | null> {
  return null;
}
async function comparePasswords(plain: string, hashed: string) {
  return false;
}
