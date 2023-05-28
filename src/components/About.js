import React from "react";
import styles from "./About.module.css";
const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>About Us</h1>

      <p>Track Your Expenses</p>
      <p className={styles.text}>
        Our platform allows you to effortlessly record and categorize your
        expenses, whether it's for groceries, bills, entertainment, or any other
        category. By having a detailed breakdown of your spending, you can
        better understand where your money is going and make informed decisions
        about your budget.{" "}
      </p>
      {/* <img
        src="https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      /> */}
      <p className={styles.text}>
        Simplify the budget tracking process with our seamless integration with
        financial institutions. Our platform securely connects to your bank
        accounts, credit cards, and other financial accounts, automatically
        importing your transactions and eliminating the need for manual data
        entry. This saves you time and ensures accurate and up-to-date financial
        information
      </p>
      <h2>Our Approach</h2>
      <p className={styles.text}>
        We prioritize the security and privacy of your financial information.
        Our platform employs robust encryption and follows industry best
        practices to ensure that your data is safe and confidential. You can
        trust that your sensitive information is protected at all times.
      </p>
    </div>
  );
};

export default About;
