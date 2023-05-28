import React from "react";
import styles from "./Dashboard.module.css";
import ExpenseCard from "./ExpenseCard";
import Options from "./Options";
import Card from "../components/Card";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid1}>
        <Options />
      </div>

     
      <div className={styles.grid4}>
        <ExpenseCard />
      </div>
    </div>
  );
};

export default Dashboard;
