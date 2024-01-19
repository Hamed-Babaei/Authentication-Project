import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

function Index() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const signin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });
    if (res.status === 200) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <label>Username | Email</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            autoComplete="off"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <input
          type="submit"
          className="register-btn"
          value="Sign In"
          onClick={signin}
        />
      </form>
    </div>
  );
}

export default Index;
