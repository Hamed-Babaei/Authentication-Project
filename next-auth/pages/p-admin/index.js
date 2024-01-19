import { getSession } from "next-auth/react";
import React from "react";
import UserModel from "@/models/User";

export default function index({ user }) {
  return (
    <div>
      <h1>
        Welcome to Admin Panel , {user.firstName} - {user.lastName}
      </h1>
    </div>
  );
}

//? SSR Route Protection => (RBAK)
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  }
  const user = await UserModel.findOne(
    { email: session.user.email },
    "firstName lastName role"
  );

  if (user.role === "USER") {
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
