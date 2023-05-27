import React, { useState } from "react";
import styles from "./Signup.module.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setphoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: firstName,
        email: email,
        phone: phone,
        password: password,
        photo: photo,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      alert("Successfully Signed in");
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 id={styles.headin}>Sign Up</h2>
        <label className={styles.label}>
          First Name: &emsp;
          <br />
          <input
            type="text"
            id="firstName"
            value={firstName}
            className={styles.input}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Last Name: &emsp;
          <br />
          <input
            type="text"
            id="lastName"
            value={lastName}
            className={styles.input}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Phone Number: &emsp;
          <br />
          <input
            type="number"
            id="phone"
            value={phone}
            className={styles.input}
            onChange={(event) => setphone(event.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Email : &emsp;
          <br />
          <input
            type="email"
            id="email"
            value={email}
            className={styles.input}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label htmlFor="password" className={styles.label}>
          Password :
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className={styles.input}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label className={styles.label}>
          Photo : &emsp;
          <br />
          <input
            type="file"
            id="photo"
            value={photo}
            className={styles.input}
            onChange={(event) => setphoto(event.target.value)}
            required
          />
        </label>

        <button type="submit" onClick={handleSubmit} className={styles.button}>
          Submit
        </button>
        <p className={styles.login}>
          Already have an Account?{" "}
          <strong>
            {" "}
            <NavLink to="/login">Login</NavLink>
          </strong>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
