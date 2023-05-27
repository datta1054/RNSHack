import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Newpassword() {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");

  const handleclick = () => {
    navigate("/SetNewpassword");
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
