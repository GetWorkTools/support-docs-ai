import isEmpty from "lodash/isEmpty";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { saveUserToDB } from "@/server/integrations/database";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  strategy: "jwt",
  callbacks: {
    async signIn(data: any) {
      const { userDetail, error } = await saveUserToDB(data.user);

      return isEmpty(userDetail) || error ? false : true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
