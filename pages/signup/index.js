import { useRouter } from "next/router";
import React, { useState } from "react";

function Index() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signUp = async (e) => {
    e.preventDefault();

    const user = { firstName, lastName, userName, email, password };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.status === 201) {
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
      alert("Registered Successfully :))");
      router.push("/dashboard");
    } else if (res.status === 422) {
      alert("This Username or Email already Exist!!");
    }
  };
  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" method="post">
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input
            type="text"
            autoComplete="off"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input
            type="email"
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
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
          value="Sign Up"
          onClick={signUp}
        />
      </form>
    </div>
  );
}

export default Index;
