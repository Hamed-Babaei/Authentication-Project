import { verifyToken } from "@/utils/auth";
import connectToDB from "@/configs/db";
import React from "react";
import UserModel from "@/models/user";

function Dashboard({ user }) {
  console.log(user);
  return (
    <>
      <h1>
        {user.firstName} - {user.lastName} - Welcome To Dashboard
      </h1>
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  connectToDB();

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  const tokenPayload = verifyToken(token);
  console.log("tokenPayload", tokenPayload);
  if (!tokenPayload) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }

  const user = await UserModel.findOne(
    { email: tokenPayload.email },
    "firstName lastName"
  );
  console.log("User", user);

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default Dashboard;
