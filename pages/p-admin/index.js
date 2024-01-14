import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/user";
import React from "react";
import { redirect } from "next/dist/server/api-utils";

function PAdmin({ user }) {
  return (
    <h1>
      Welcome To Admin Panel {user.firstName} {user.lastName}❤️
    </h1>
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
    "firstName lastName role"
  );
  if (user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default PAdmin;
