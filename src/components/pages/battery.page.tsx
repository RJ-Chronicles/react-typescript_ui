import { useEffect, useContext, useState } from "react";
import batteryService from "../../services/BatteryService";
import AuthContext from "../../context/appContext";
import { Headers, BatteryPayload } from "../../AppModel";
import { Link } from "react-router-dom";
import { getFormatedDate } from "../helper/helperFunctions";
interface List {
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const Battery = () => {
  const appContext = useContext(AuthContext);
  const authToken = appContext.token;
  const [battery, setBattery] = useState<BatteryPayload>();

  useEffect(() => {
    const headers: Headers = {
      headers: {
        Authorization: authToken,
      },
    };
    const fetBatteryList = async () => {
      const response = await batteryService.getListOfBatteries(headers);
      console.log(response.data);
      setBattery(response.data);
    };
    fetBatteryList();
  }, [authToken]);
  return (
    <div className="w-full mt-10">
      <div className="flex flex-col justify-center items-center md:flex-row ">
        {/* leftside for battery */}
        <div className="md:min-h-screen shadow-md w-full">
          <h1 className="text-center text-2xl font-bold">
            List Of Available Batteries
          </h1>
          <div className="relative  shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Battery name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {battery?.list.map((obj) => {
                  return (
                    <tr className="bg-white border-b text-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4   text-gray-900 whitespace-nowrap dark:text-white">
                        {obj.name}
                      </td>
                      <td className="px-6 py-4">
                        {getFormatedDate(obj.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* rightside for amp size */}
        <div className="md:min-h-screen shadow-md w-full">
          <h1 className="text-center text-2xl font-bold">
            List Of Available Ampere size
            {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Battery name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {battery?.list.map((obj) => {
                    return (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">Silver</td>
                        <td className="px-6 py-4">Laptop</td>
                        <td className="px-6 py-4">$2999</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            to="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div> */}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Battery;
