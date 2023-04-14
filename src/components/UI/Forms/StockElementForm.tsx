import React, { useState, useContext, useEffect } from "react";
import amprService from "../../../services/AmphereService";
import btryService from "../../../services/BatteryService";

import stockService from "../../../services/StockService";
import AuthContext from "../../../context/appContext";
import {
  Headers,
  Stock,
  BatteryPayload,
  AmpherePayload,
} from "../../../AppModel";
interface propsType {
  initialData: {
    battery_name: string;
    product_code: string;
    amphere_size: string;
    quantity: string;
    mrp: string;
    id: string;
  };
  closeModal: () => void;
  action: string;
}
const StockElementForm = (props: propsType) => {
  const { initialData, closeModal, action } = props;
  const appContext = useContext(AuthContext);
  const authToken = appContext.token;
  console.log(initialData);
  const headers: Headers = {
    headers: {
      Authorization: authToken,
    },
  };

  const [batteryName, setBatteryName] = useState(initialData.battery_name);
  const [productCode, setProductCode] = useState(initialData.product_code);
  const [amphereSize, setAmphereSize] = useState(initialData.amphere_size);
  const [quantity, setQuantity] = useState(initialData.quantity);
  const [MRP, setMRP] = useState(initialData.mrp);
  const [batteryList, setBatteryList] = useState<BatteryPayload>();
  const [amphere, setAmphere] = useState<AmpherePayload>();
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const stockElementDetails: Stock = {
      battery_name: batteryName,
      product_code: productCode,
      amphere_size: amphereSize,
      quantity: parseInt(quantity),
      mrp: parseInt(MRP),
    };
    console.log(stockElementDetails);
    if (action === "ADD") {
      await stockService.submiSizeDetails(stockElementDetails, headers);
    }
    if (action === "UPDATE") {
      await stockService.updateSizeById(
        stockElementDetails,
        initialData.id,
        headers
      );
    }
    appContext.refreshData();
    closeModal();
  };

  useEffect(() => {
    const headers: Headers = {
      headers: {
        Authorization: authToken,
      },
    };
    const fetchBatteryList = async () => {
      const response = await btryService.getListOfBatteries(headers);
      setBatteryList(response.data);
      // response.data.list.map(name => setBatteryList(prev=>[...prev, name]));
    };
    const fetchSizeList = async () => {
      const response = await amprService.getListOfAvailableSize(headers);
      setAmphere(response.data);
    };
    fetchSizeList();
    fetchBatteryList();
  }, [authToken]);

  return (
    <div className="w-full mx-auto px-5 rounded-lg -none">
      <h1 className="text-2xl font-semibold">
        {action === "ADD" ? "Add new Recoard" : "Update Recoard"}
      </h1>
      <form
        className="px-8 md:px-16 pt-6 pb-4 bg-white rounded shadow-md"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Product code
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={(e) => setProductCode(e.target.value)}
            id="name"
            placeholder="Product code"
            value={productCode}
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="role"
          >
            Battery Name
          </label>
          <select
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            onChange={(e) => setBatteryName(e.target.value)}
            value={batteryName}
            id="role"
          >
            <option value="DEFAULT">Choose battery name</option>
            {batteryList?.list.map((data, index) => {
              return (
                <option key={index} value={data.name}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="role"
          >
            Amphere Size
          </label>
          <select
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="size"
            value={amphereSize}
            onChange={(e) => setAmphereSize(e.target.value)}
          >
            <option value="DEFAULT">Choose battery size</option>
            {amphere?.list.map((data, index) => {
              return (
                <option key={index} value={data.size}>
                  {data.size}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            Quantity
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="number"
            required
            onChange={(e) => setQuantity(e.target.value)}
            id="name"
            placeholder="Product code"
            value={quantity}
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="name"
          >
            MRP
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="number"
            required
            onChange={(e) => setMRP(e.target.value)}
            id="name"
            placeholder="Product code"
            value={MRP}
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StockElementForm;
