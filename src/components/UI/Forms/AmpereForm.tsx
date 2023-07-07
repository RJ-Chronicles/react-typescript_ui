import React, { useState, useContext } from "react";

import amprService from "../../../services/AmphereService";
import AuthContext from "../../../context/appContext";
import { Headers, Amphere } from "../../../AppModel";
interface propsType {
  initialData: {
    size: string;
    id: string;
  };
  closeModal: () => void;
  action: string;
}
const AmphereForm = (props: propsType) => {
  const { initialData, closeModal, action } = props;
  const appContext = useContext(AuthContext);
  const authToken = appContext.token;
  const headers: Headers = {
    headers: {
      Authorization: authToken,
    },
  };

  const [size, setSize] = useState(initialData.size);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amphereSize: Amphere = {
      size,
    };
    if (action === "ADD") {
      await amprService.submiSizeDetails(amphereSize, headers);
    }
    if (action === "UPDATE") {
      await amprService.updateSizeById(amphereSize, initialData.id, headers);
    }
    appContext.refreshData();
    closeModal();
  };
  return (
    <div className="w-full mx-auto px-5 rounded-lg -none">
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
            Size in Amphere
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={(e) => setSize(e.target.value)}
            id="name"
            placeholder="Size in Amphere"
            value={size}
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
export default AmphereForm;
