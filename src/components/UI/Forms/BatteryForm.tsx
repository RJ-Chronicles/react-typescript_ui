import React, { useState, useContext } from "react";
import batteryService from "../../../services/BatteryService";
import AuthContext from "../../../context/appContext";
import { Headers, Battery } from "../../../AppModel";
interface propsType {
  initialData: {
    name: string;
    id: string;
  };
  closeModal: () => void;
  action: string;
}
const BatteryForm = (props: propsType) => {
  const { initialData, closeModal, action } = props;
  const appContext = useContext(AuthContext);
  const authToken = appContext.token;
  const headers: Headers = {
    headers: {
      Authorization: authToken,
    },
  };

  const [name, setName] = useState(initialData.name);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const battery: Battery = {
      name,
    };
    if (action === "ADD") {
      await batteryService.submitBatteryDetails(battery, headers);
    }
    if (action === "UPDATE") {
      await batteryService.updateCustomerById(battery, initialData.id, headers);
    }
    appContext.refreshData();
    closeModal();
  };
  return (
    <div className="w-full mx-auto   py-10 px-5 rounded-lg -none">
      <h1 className="w-full text-white p-3 shadow-md rounded-md text-lg font-semibold bg-[#600080]">
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
            Battery Name
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Battery Name"
            value={name}
          />
        </div>
        <button
          type="submit"
          className="w-full flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default BatteryForm;
