import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: " Next-Credentials",
      //   credentials: {
      //     username: {
      //       label: "Username",
      //       type: "text",
      //       placeholder: "Username...",
      //     },
      //     password: {
      //       label: "Password",
      //       type: "password",
      //       placeholder: "Password...",
      //     },
      //   },
      async authorize(credentials, req) {
        connectToDB();
        const { identifier, password } = credentials;
        if (!identifier.trim() || !password.trim()) {
          throw new Error("Data is not Valid !!");
        }

        const user = await UserModel.findOne({
          $or: [{ username: identifier }, { email: identifier }],
        });
        if (!user) {
          throw new Error("user not found!!");
        }

        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
          throw new Error("Username or password is not valid");
        }
        //? return in Jwt payload
        return { email: user.email };
      },
    }),
  ],
});
