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
  const [otp, setOtp] = useState("");
  const [encotp, setEncOtp] = useState("");
  const [phone, setphone] = useState();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("clicked");
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
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.status !== 201) {
      alert("Enter Valid Credentials");
    } else {
      alert("OTP Sent To Your Registed Email");
      localStorage.setItem("email", JSON.stringify(email));
      localStorage.setItem("token", JSON.stringify(data.token));
      setEncOtp(data.encryptedOTP);
      // navigate("/");
    }
  };
  const handleOTP = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: firstName,
        email: email,
        encryptedOTP: encotp,
        otp: otp,
        phone: phone,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      navigate("/");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 id={styles.headin}>Sign Up</h2>
        <label className={styles.label}>
          Full Name: &emsp;
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

        <button type="submit" onClick={handleSubmit} className={styles.button}>
          Verify Email
        </button>
        <label className={styles.label}>
          OTP : &emsp;
          <br />
          <input
            type="text"
            id="otp"
            value={otp}
            className={styles.input}
            onChange={(event) => setOtp(event.target.value)}
            required
          />
        </label>
        <button type="submit" onClick={handleOTP} className={styles.button}>
          Verify otp
        </button>
        <p className={styles.login}>
          Already have an Account?
          <strong>
            <NavLink to="/login">Login</NavLink>
          </strong>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
