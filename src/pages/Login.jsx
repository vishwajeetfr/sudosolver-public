import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
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
      setErr("   invalid credentials");
    }
  };

  return (
    <div>
      <h1>sudosolver</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="login-button">
          Login
        </button>
        <br></br>
        <>
          {err}
          <br></br>
        </>
      </form>
      <p>
        NEW USER? <Link to="/signup">Create Account</Link>
      </p>
    </div>
  );
};

export default Login;
