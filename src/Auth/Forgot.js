import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Forgot() {
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [encotp, setEncOtp] = useState("");
  const navigate = useNavigate();

  const sendOTP = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8000/api/users/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (response.status !== 201) {
      alert("Enter Valid Credentials");
    } else {
      alert("Email Sent");
      setEncOtp(json.encryptedOTP);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:8000/api/users/update-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
          encryptedOTP: encotp,
          otp: otp,
          password: password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (response.status !== 201) {
      alert("wrong credentials");
    } else {
      alert("password reset!");
      navigate("/login");
    }
  };

  const [email, setEmail] = useState("");
  return (
    <div>
      <div className={styles.container}>
        <form className={styles.form}>
          <h2 id={styles.headin}>Forgot password</h2>
          <label className={styles.label}>
            Email: &emsp;
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <button type="submit" className={styles.button} onClick={sendOTP}>
            Submit
          </button>
        </form>
        <form className={styles.form}>
          <h2 id={styles.headin}>Enter OTP</h2>
          <label className={styles.label}>
            Check your mail for the OTP : &emsp;
            <input
              placeholder="Enter the OTP"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            Enter Below : &emsp;
            <br />
            <input
              placeholder="New password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <button type="submit" className={styles.button} onClick={handleClick}>
            Verify
          </button>
        </form>
      </div>
      {/* <div className={styles.container}>
      <form  className={styles.form}>
        <h2 id={styles.headin}>Enter OTP</h2>
        <label className={styles.label}>
          Check your mail for the OTP : &emsp;
          <input placeholder="Enter the OTP"
            type="number"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            className={styles.input}
            required
          />
          </label>
          <label className={styles.label}>
          Enter Below : &emsp;
          <br/>
          <input placeholder="New password"
            type="text"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className={styles.input}
            required
          />
          </label>
        
        
        <button type="submit" className={styles.button} onClick={handleclick}>

        Verify
          
        </button>
      </form> */}
    </div>
    // </div>
  );
}

export default Forgot;
