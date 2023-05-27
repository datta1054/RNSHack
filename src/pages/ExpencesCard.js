import React from "react";
import styles from "./ExpencesCard.module.css";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const ExpencesCard = (props) => {
  const data = props.data;
  const [id, setId] = useState("");

  const onDelete = async (i) => {
    const response = await fetch(
      "http://localhost:8000/api/users/expenses/delete/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ExpenseNumberID: data[i].ExpenseNumberID,
        }),
      }
    );
  };
  const onUpdate = async (i) => {
    const amount = prompt("Enter New value to be Updated");
    const response = await fetch("http://localhost:8000/api/users/expenses/update/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ExpenseNumberID: data[i].ExpenseNumberID,
        amount: amount,
      }),
    });
  };

  return (
    <>
      <h2>Recent Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={item.ExpenseNumberID}>
              <td>{item.category}</td>
              <td>{item.amount}</td>
              <td>{new Date(item.curr_date).toLocaleDateString()}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => onDelete(i)}
                >
                  <AiFillDelete />
                </button>

                <button
                  className={styles.deleteButton}
                  onClick={() => onUpdate(i)}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ExpencesCard;
