import React, { useState, useContext } from "react";

import GstService from "../../../services/GSTService";
import AuthContext from "../../../context/appContext";
import { Headers, GST } from "../../../AppModel";
interface propsType {
  initialData: {
    gst: string;
    id: string;
  };
  closeModal: () => void;
  action: string;
}
const GSTForm = (props: propsType) => {
  const { initialData, closeModal, action } = props;
  const appContext = useContext(AuthContext);
  const authToken = appContext.token;
  const headers: Headers = {
    headers: {
      Authorization: authToken,
    },
  };

  const [gstValue, setGST] = useState(initialData.gst);
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const gst = parseInt(gstValue);
    const gstData: GST = {
      gst,
    };

    if (action === "ADD") {
      try {
        await GstService.submitGSTRecord(gstData, headers);
      } catch (err: any) {
        throw new Error("Something wend wrong!");
      }
    }
    if (action === "UPDATE") {
      try {
        await GstService.updateGSTItemById(gstData, initialData.id, headers);
      } catch (err: any) {
        throw new Error("Something wend wrong!");
      }
    }
    appContext.refreshData();
    closeModal();
  };
  return (
    <div className="w-full mx-auto   py-10 px-5 rounded-lg -none">
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
            GST
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            required
            onChange={(e) => setGST(e.target.value)}
            id="name"
            placeholder="GST"
            value={gstValue}
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
export default GSTForm;
