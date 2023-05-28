import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { format, subMonths } from "date-fns";

const BarChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const startDate = subMonths(new Date(), 6);
    const labels = ["Food", "Travel", "Rent", "Groceries", "Bills", "Others"];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Bar Chart For ExpensesF",
          data: props.data,
          backgroundColor: [
            " rgb(17, 0, 255)",
            "rgb(255, 0, 0)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            " rgb(255, 255, 255)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const chart = new Chart(ctx, config);

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;
