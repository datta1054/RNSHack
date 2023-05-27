import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const SetNewpassword = () => {
  const navigate = useNavigate();
  const [password, setpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");

  const handleclick = () => {
    if (
      password === newpassword &&
      password.length !== 0 &&
      newpassword.length !== 0
    ) {
      navigate("/");
    } else {
      alert("Enter same password");
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleclick} className={styles.form}>
          <h2 id={styles.headin}>Enter OTP</h2>
          <label className={styles.label}>
            Enter Below : &emsp;
            <br />
            <input
              placeholder="New password"
              type="text"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className={styles.input}
              required
            />
            <input
              placeholder="Re-enter"
              type="password"
              value={newpassword}
              onChange={(e) => setNewpassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <button type="submit" className={styles.button} onClick={handleclick}>
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewpassword;
