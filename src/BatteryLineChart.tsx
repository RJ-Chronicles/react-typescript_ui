import React from "react";
import Chart from "react-google-charts";
const LineData = [
  ["x", "dogs", "cats"],
  [0, 0, 0],
  [1, 70000, 80000],
  [2, 60000, 70000],
  [3, 80000, 100000],
  [4, 70000, 90000],
  [5, 120000, 140000],
  [6, 90000, 100000],
  [7, 80000, 120000],
  [8, 100000, 110000],
  [9, 80000, 100000],
  [10, 90000, 50000],
  [11, 70000, 90000],
  [12, 90000, 50000],
];
const LineChartOptions = {
  hAxis: {
    title: "Time",
  },
  vAxis: {
    title: "Popularity",
    ticks: [0, 40000, 80000, 120000, 160000],
  },
  series: {
    0: { curveType: "function" },
    1: { curveType: "function" },
  },
};

const BatteryLineChart = () => {
  return (
    <div className="mt-5 w-full min-h-min">
      <h2>React Google Line Chart Example</h2>
      <Chart
        width={"100%"}
        height={"100%"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={LineData}
        options={LineChartOptions}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default BatteryLineChart;

/*


  ["x", "dogs", "cats"],
  ["JAN", 0, 0],
  ["FEB", 10, 5],
  ["MAR", 23, 15],
  ["APRIL", 17, 9],
  ["MAY", 18, 10],
  ["JUNE", 9, 5],
  ["JULY", 11, 3],
  ["AUGUST", 27, 19],
  ["SEPTEMBER", 27, 19],
  ["OCTOBER", 27, 19],
  ["NOVEMBER", 27, 19],
  ["DECEMBER", 27, 19],
*/
