import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

function ExpenseCard() {
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
      const ExpCategory = [0, 0, 0, 0, 0, 0];
      array.forEach((item) => {
        // console.log(item.amount);
        if (item.category === "Food") {
          ExpCategory[0] += item.amount;
        } else if (item.category === "Travel") {
          ExpCategory[1] += item.amount;
        } else if (item.category === "Rent") {
          ExpCategory[2] += item.amount;
        } else if (item.category === "Groceries") {
          ExpCategory[3] += item.amount;
        } else if (item.category === "Bills") {
          ExpCategory[4] += item.amount;
        } else if (item.category === "Others") {
          ExpCategory[5] += item.amount;
        }
      });
      console.log(ExpCategory);
      setData(ExpCategory);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {data.length && <PieChart data={data} />}
      {data.length && <BarChart data={data} />}
      {data.length && <LineChart data={data} />}
    </div>
  );
}

export default ExpenseCard;
