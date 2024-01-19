import { getSession } from "next-auth/react";
import React from "react";

export default function index({ user }) {
  return (
    <div>
      <h1>welcome to dashboard , {user.email}</h1>
    </div>
  );
}

//? SSR Route Protection =>
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
      },
    };
  } else {
    return {
      props: {
        user: session.user,
      },
    };
  }
}
