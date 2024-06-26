import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error(error);
      setErr("invalid credentials");
    }
  };

  return (
    <div>
      <h1>sudosolver</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="email"
          placeholder="Your Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br></br>
        <button type="submit" className="signup-button">
          Signup
        </button>
        <br></br>
        <>
          {err}
          <br></br>
        </>
      </form>
      <p>
        EXISTING USER? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
