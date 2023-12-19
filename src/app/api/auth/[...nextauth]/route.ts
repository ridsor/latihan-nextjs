import { NextAuthOptions } from "next-auth";
import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "ridsor123",
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        async authorize(credentials: any) {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const user = {
            id: 1,
            name: "Ridsor",
            email: "ridsor@gmail.com",
            role: "admin",
          };
          if (email === "ridsor@gmail.com" && password === "password") {
            return user;
          }
          return null;
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        (token.email = user.email),
          (token.name = user.name),
          token.role - user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("name" in token) {
        session.user.name = token.name;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }

      return session;
    },
  },
};
