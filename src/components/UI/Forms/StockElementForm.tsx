import React, { useState, useContext, useEffect } from "react";
import amprService from "../../../services/AmphereService";
import btryService from "../../../services/BatteryService";

import stockService from "../../../services/StockService";
import AuthContext from "../../../context/appContext";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
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
    available: string;
    id: string;
  };
  closeModal: () => void;
  action: string;
  open: boolean;
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
  const [batteryList, setBatteryList] = useState<BatteryPayload>();
  const [amphere, setAmphere] = useState<AmpherePayload>();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("initialData.available : " + initialData.available);
    const stockElementDetails: Stock = {
      battery_name: batteryName,
      product_code: productCode,
      amphere_size: amphereSize,
      available: parseInt(initialData.available),
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

  const handleClose = () => {
    props.closeModal();
  };
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
          <div className="flex items-start justify-between  border-b border-solid border-slate-200 rounded-t">
            <h3 className="w-full text-white p-4 shadow-md- font-sans rounded-md text-lg font-semibold bg-[#600080]">
              {action === "ADD" ? "Add new Recoard" : "Update Recoard"}
            </h3>
          </div>
        </DialogTitle>
        <div className="w-full  bg-white px-5 rounded-lg lg:rounded-l-none">
          <form
            className="px-8 pt-6 pb-4 bg-white rounded"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="product_code"
              >
                Serial Number
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                required
                onChange={(e) => setProductCode(e.target.value)}
                id="product_code"
                placeholder="Product code"
                value={productCode}
              />
            </div>

            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0">
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
              <div className="md:ml-2">
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
            </div>
            <div className="mb-6 text-center">
              <button
                className="w-full text-center space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
                type="submit"
              >
                {action === "ADD" ? "Add Stock" : "Update Stock"}
              </button>
            </div>
          </form>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StockElementForm;
