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
    console.log("before model close");
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

        <div className="mb-6 text-center">
          <button
            className="w-full text-center  bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default GSTForm;
