import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      alert("Successfully Logged in");
      setemail("");
      setpassword("");
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 id={styles.headin}>Login</h2>
        <label className={styles.label}>
          Email: &emsp;
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Password: &emsp;
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <button type="submit" onSubmit={handleSubmit} className={styles.button}>
          Submit
        </button>
        <NavLink to="/forgot" className={styles.forgot}>
          Forgot Password?
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
