// import { useState } from "react";
//import BatteryLineChart from "./BatteryLineChart";
import BatteryPieChart from "./BatteryPieChart";

// import BarChart from "./components/UI/BarChart";
// import PieChart from "./components/UI/PieChart";

const Dummy = () => {
  // const Data = [
  //   {
  //     id: 1,
  //     year: 2016,
  //     userGain: 80000,
  //     userLost: 823,
  //   },
  //   {
  //     id: 2,
  //     year: 2017,
  //     userGain: 45677,
  //     userLost: 345,
  //   },
  //   {
  //     id: 3,
  //     year: 2018,
  //     userGain: 78888,
  //     userLost: 555,
  //   },
  //   {
  //     id: 4,
  //     year: 2019,
  //     userGain: 90000,
  //     userLost: 4555,
  //   },
  //   {
  //     id: 5,
  //     year: 2020,
  //     userGain: 4300,
  //     userLost: 234,
  //   },
  // ];

  // const [chartData] = useState({
  //   labels: Data.map((data) => data.year),
  //   datasets: [
  //     {
  //       label: "Users Gained ",
  //       data: Data.map((data) => data.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  return (
    <div className="p-3  bg-gray-50 flex md:flex-row justify-between items-center">
      <div className="w-full"></div>
      <div className="w-full">
        <BatteryPieChart />
      </div>
    </div>
  );
};

export default Dummy;
