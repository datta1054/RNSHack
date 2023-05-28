import React from "react";
import { useState, useEffect } from "react";
import styles from "./Card.module.css";
function Card() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);
  let p = 0;
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
      array.forEach((item) => {
        p = p + item.amount;
      });
      setTotal(p);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className={styles.heading}>
        “It isn't what you earn but how spend it that fixes your class.”
      </div>
      <h1>Total Expenses:{total}</h1>
      <div className={styles.heading}>
        "The stock market is filled with individuals who know the price of
        everything, but the value of nothing."
      </div>
      <h1>The Budget for Next Month Estimated:{(total * 80) / 100}</h1>
      <div className={styles.heading}>
        "It is not necessary to do extraordinary things to get extraordinary
        results."
      </div>
      <h1>The Savings Estimated:{total - (total * 80) / 100}</h1>
    </div>
  );
}

export default Card;
