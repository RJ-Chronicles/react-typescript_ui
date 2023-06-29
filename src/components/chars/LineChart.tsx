import React from "react";

import { Line as LineChrt } from "react-chartjs-2";
//import { Chart,Line, PointElement } from "chart.js";
import "chart.js/auto";
// Chart.register(PointElement);
// Chart.register(Line);
// Chart.register(CategoryScale);
// Chart.register(LinearScale);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  options: { maintainAspectRatio: true },
  datasets: [
    {
      label: "EXCIDE",
      data: [33, 53, 85, 41, 44, 65],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1.5,
      pointBackgroundColor: "rgba(75,192,192,1)",
    },
    {
      label: "AMRON",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      backgroundColor: "rgba(10,12,192,0.2)",
      borderColor: "#742774",
      borderWidth: 1.5,
      hoverBorderColor: "#342f28",
      pointBackgroundColor: "#342f28",
    },
  ],
};

const LineChart = () => {
  return (
    <div className="App">
      <LineChrt data={data} />
    </div>
  );
};

export default LineChart;
