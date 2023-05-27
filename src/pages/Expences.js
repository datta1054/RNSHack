import React from "react";
import BarChart from "react-bar-chart";

const Expenses = () => {
  const data = [
    { text: "DOB", value: 500 },
    { text: "Address", value: 300 },
    { text: "Email", value: 900 },
    { text: "Phone", value: 100 },
    { text: "Name", value: 700 },
  ];

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <BarChart
          ylabel="Quantity"
          width={500}
          height={500}
          margin={margin}
          data={data}
          style={{ color: "blue" }}
        />
      </div>
    </div>
  );
};

export default Expenses;
