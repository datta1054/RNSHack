import React from "react";
import styles from "./Options.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Options = () => {
  const [expAmount, setExpAmount] = useState(0);
  const [expType, setExpType] = useState("");
  const [expDate, setExpDate] = useState();
  const [BudjetAmount, setBudjetAmount] = useState(0);
  const [BudjetType, setBudjetType] = useState("");
  const navigate = useNavigate();
  const [income, setIncome] = useState(0);
  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8000/api/users/expenses/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "s@gmail.com",
          amount: expAmount,
          category: expType,
          date: expDate,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    setExpType("");
    setExpAmount(0);
    navigate("/");
  };

  const handleSubmitBudjet = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/users/budget/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "s@gmail.com",
        Budjet: BudjetAmount,
        description: BudjetType,
      }),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdowns}>
        <h3 className={styles.subtitle}>Expenses</h3>
        <select
          value={expType}
          className={styles.dropdown}
          onChange={(event) => setExpType(event.target.value)}
        >
          <option value="">Select</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Rent">Rent</option>
          <option value="Groceries">Groceries</option>
          <option value="Bills">Bills</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="number"
          id="expAmount"
          value={expAmount}
          className={styles.input}
          onChange={(event) => setExpAmount(event.target.value)}
          required
        />
        <input
          type="date"
          id="expDate"
          value={expDate}
          className={styles.input}
          onChange={(event) => setExpDate(event.target.value)}
        />
        <button className={styles.button} onClick={handleSubmitExpense}>
          Submit
        </button>
        <h3 className={styles.subtitle}>Budjet</h3>
        <select
          className={styles.dropdown}
          value={BudjetType}
          onChange={(event) => setBudjetType(event.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Rent">Rent</option>
          <option value="Groceries">Groceries</option>
          <option value="Bills">Bills</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="number"
          id="expAmount"
          value={BudjetAmount}
          className={styles.input}
          onChange={(event) => setBudjetAmount(event.target.value)}
          required
        />
        <button className={styles.button} onClick={handleSubmitBudjet}>
          Submit
        </button>
        <h2> Total Salary per Month</h2>
        <input
          type="number"
          id="expAmount"
          value={BudjetAmount}
          className={styles.input}
          onChange={(event) => setBudjetAmount(event.target.value)}
          required
        />
        <button className={styles.button} onClick={handleSubmitBudjet}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Options;
