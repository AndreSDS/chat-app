import NextAuth, { CallbacksOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
  callbacks: {
    async signIn({ profile }: { profile: { login: string } }) {
      return profile.login === "AndreSDS";
    },
  } as unknown as CallbacksOptions,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
