import Dummy from "../../Dummy";
import LineChart from "../chars/LineChart";
import AuthContext from "../../context/appContext";
import Header from "../UI/Header";
import { useContext } from "react";
export default function Dashboard() {
  const appContext = useContext(AuthContext);
  return (
    <div className=" bg-[#F9FAFB] w-full">
      <Header>
        <h1 className="text-xl font-semibold font-sans">
          Hi, Welcom back {appContext.user.name.split(" ")[0]}
        </h1>
      </Header>
      <div className="m-10 ">
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
          <div className="w-full px-4 py-5 bg-[#D0F2FF] rounded-lg shadow">
            <div className="flex justify-center items-center">
              <div className="w-16 h-16 rounded-full shadow-lg flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            </div>
            <div className="pt-6">
              <div className="text-sm font-medium text-[#04297A] truncate text-center">
                Total users
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900 text-center">
                12,00
              </div>
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-[#D1E9FC] rounded-lg shadow">
            <div className="flex justify-center items-center">
              <div className="w-16 h-16 rounded-full shadow-lg flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="pt-6 text-center">
              <div className="text-sm font-medium text-[#061B64] truncate">
                Total Profit
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                $ 450k
              </div>
            </div>
          </div>
          <div className="w-full px-4 py-5 bg-[#FFF7CD] rounded-lg shadow">
            <div className="flex justify-center items-center">
              <div className="w-16 h-16 rounded-full shadow-lg flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
              </div>
            </div>
            <div className="pt-6 text-center">
              <div className="text-sm font-medium text-[#7A4F01] truncate">
                Total Orders
              </div>
              <div className="mt-1 text-3xl font-semibold text-gray-900">
                20k
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="shadow-lg rounded-lg overflow-hidden">
            <div className="py-3 px-5 bg-gray-50 flex justify-between items-center">
              <Dummy />
            </div>
          </div>
          <div style={{ position: "relative", margin: "auto", width: "80vw" }}>
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
}
