import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { RiMentalHealthLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  const onButton = () => {};
  return (
    <nav className={styles.navbar}>
      <strong>
        <div className={styles.logo}>
          <RiMentalHealthLine />
          <span>Title</span>
        </div>
      </strong>

      <ul className={`${styles.menu} ${isOpen ? styles.showMenu : ""}`}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/expenses">Expenses</NavLink>
        </li>
        <li>
          <NavLink to="/budgets">Budgets</NavLink>
        </li>
        {/* <li> 
          <NavLink to="/chat">
            <button className={styles.button} onClick={onButton}>
              Chat Now
            </button>
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
