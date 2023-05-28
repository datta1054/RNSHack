import React from "react";
import styles from "./Options.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpencesCard from "./ExpencesCard";
import LineChart from "./LineChart";
function Expenses() {
  const [expAmount, setExpAmount] = useState(0);
  const [expType, setExpType] = useState("");
  const [expDate, setExpDate] = useState();

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

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
        }),
      });
      const jsonData = await response.json();
      const array = jsonData.data;
      setData(array);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className={styles.dropdownContainer}>
      <ExpencesCard data={data} />
      <div className={styles.dropdowns}>
        <h3 className={styles.subtitle}>Add Expenses</h3>
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
      </div>
    </div>
  );
}

export default Expenses;
