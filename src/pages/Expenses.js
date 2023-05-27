import React from "react";
import styles from "./Options.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Expenses() {
  const [expAmount, setExpAmount] = useState(0);
  const [expType, setExpType] = useState("");
  const [expDate, setExpDate] = useState();
  const [rexpAmount, setRExpAmount] = useState(0);
  const [rexpType, setRExpType] = useState("");
  const [uexpAmount, setUExpAmount] = useState(0);
  const [uexpType, setUExpType] = useState("");

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
          email: "guru@gmail.com",
          amount: expAmount,
          date: expDate,
          category: expType,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
  };
  const handleSubmitExpenseR = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8000/api/users/expenses/delete/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "guru@gmail.com",
          amount: rexpAmount,
          category: rexpType,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
  };

  const handleSubmitExpenseU = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8000/api/users/expenses/update/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "guru@gmail.com",
          amount: uexpAmount,
          category: uexpType,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdowns}>
        <h1>Expenses</h1>
        <h3 className={styles.subtitle}>Add Expenses</h3>
        <select
          value={expType}
          className={styles.dropdown}
          onChange={(event) => setExpType(event.target.value)}
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
        <h3 className={styles.subtitle}>Remove Expenses</h3>
        <select
          value={rexpType}
          className={styles.dropdown}
          onChange={(event) => setRExpType(event.target.value)}
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
          id="rexpAmount"
          value={rexpAmount}
          className={styles.input}
          onChange={(event) => setRExpAmount(event.target.value)}
          required
        />
        <button className={styles.button} onClick={handleSubmitExpense}>
          Submit
        </button>
        <h3 className={styles.subtitle}>Update Expenses</h3>
        <select
          value={uexpType}
          className={styles.dropdown}
          onChange={(event) => setUExpType(event.target.value)}
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
          id="uexpAmount"
          value={uexpAmount}
          className={styles.input}
          onChange={(event) => setUExpAmount(event.target.value)}
          required
        />
        <button className={styles.button} onClick={handleSubmitExpense}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Expenses;
