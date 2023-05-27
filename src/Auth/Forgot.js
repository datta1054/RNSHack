import React, { useState } from "react";
import styles from "./Login.module.css";

function Forgot() {
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 id={styles.headin}>Forgot Password</h2>
        <label className={styles.label}>
          Forgot: &emsp;
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </label>

        <button type="submit" className={styles.button}>
          Submit
        </button>
        {/* <p className={styles.forgot}>Forgot Password?</p> */}
      </form>
    </div>
  );
}

export default Forgot;
