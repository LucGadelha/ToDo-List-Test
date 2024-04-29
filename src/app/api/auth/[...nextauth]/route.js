import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connect from "@/dbConfig/db.js";

const options = NextAuth({
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const validPassword = await bcrypt.compare(credentials.password, user.password);

            if (validPassword) {
              return user;
            } else {
              throw new Error("Senha invalida!");
            }
          } else {
            throw new Error("Dados de Login inválidos!");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: { error: "/login" },
});

export { options as GET, options as POST };
