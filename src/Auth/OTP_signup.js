import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Newpassword() {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  //   const [password, setpassword] = useState("");
  // const [password, setpassword] = useState("");

  const handleclick = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        otp: OTP,
        encryptedOTP: response.encryptedOTP,
        // password:password
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Email");
    }
    if (json.success) {
      alert("Email Sent");
      navigate("/Newpassword");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleclick} className={styles.form}>
        <h2 id={styles.headin}>Enter OTP</h2>
        <label className={styles.label}>
          Check your mail for the OTP : &emsp;
          <input
            placeholder="Enter the OTP"
            type="number"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            className={styles.input}
            required
          />
        </label>

        <button type="submit" className={styles.button} onClick={handleclick}>
          Verify
        </button>
      </form>
    </div>
  );
}

export default Newpassword;
