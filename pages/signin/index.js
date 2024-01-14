import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //? FOR Route Protection Best Way Is ( SSR - Route Protection ) 🎯 {
  useEffect(() => {
    fetch("/api/auth/me").then((res) => {
      if (res.status === 200) {
        router.replace("/dashboard");
      }
    });
  }, []);
  //? }
  const signIn = async (e) => {
    e.preventDefault();

    const user = { identifier, password };

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 200) {
      setIdentifier("");
      setPassword("");
      alert("Login Successfully");
      router.replace("/dashboard");
    } else if (res.status === 422) {
      alert("Username or Password is not Valid !!");
    } else if (res.status === 404) {
      alert("User not Found !!");
    } else if (res.status === 404) {
      alert("Unknown internal server error !!");
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
          onClick={signIn}
        />
      </form>
    </div>
  );
}

export default Index;
