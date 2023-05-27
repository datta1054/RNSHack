import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { parseISO } from "date-fns";
const TimeChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      datasets: [
        {
          data: [
            { x: "2021-11-06 23:39:30", y: 50 },
            { x: "2021-11-07 01:00:28", y: 60 },
            { x: "2021-11-07 09:00:28", y: 20 },
          ],
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              parser: "YYYY-MM-DD HH:mm:ss",
              displayFormats: {
                quarter: "MMM YYYY",
              },
            },
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

export default TimeChart;
