import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { format, subMonths } from "date-fns";

const LineChart = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const startDate = subMonths(new Date(), 6); // Start date: 6 months ago
    const labels = Array.from({ length: 6 }, (_, index) =>
      format(subMonths(startDate, index), "MMMM")
    );

    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: props.data,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
    };

    const chart = new Chart(ctx, config);

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineChart;
