import React from "react";
import styles from "./Dashboard.module.css";
import LeftSideBar from "./LeftSideBar";
import ExpenseCard from "./ExpenseCard";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid1}>
        <LeftSideBar />
      </div>
      <div className={styles.grid4}>
        <ExpenseCard />
      </div>
    </div>
  );
};

export default Dashboard;
