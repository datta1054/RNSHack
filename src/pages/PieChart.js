import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styles from "./PieChart.module.css"; // Import the CSS module

const PieChart = (props) => {
  const chartRef = useRef(null);
  console.log(props.data);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["Food", "Travel", "Rent", "Groceries", "Bills", "Others"],
      datasets: [
        {
          label: "My First Dataset",
          data: props.data,
          backgroundColor: [
            "rgb(235, 107, 52)",
            "rgb(235, 214, 52)",
            "rgb(95, 235, 52)",
            "rgb(52, 235, 211)",
            "rgb(52, 58, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 6,
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: data,
    };

    const chart = new Chart(ctx, config);

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} className={styles.chartContainer} />; // Apply the CSS module class
};

export default PieChart;
