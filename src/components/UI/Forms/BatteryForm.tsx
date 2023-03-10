import React, { useState } from "react";
interface propsType {
  title: string;
  initialData: {
    name: string;
  };
  closeModal: () => void;
}
const BatteryForm = (props: propsType) => {
  const { title, initialData, closeModal } = props;

  const [name, setName] = useState(initialData.name);
  const handleFormSubmit = () => {
    closeModal();
  };
  return (
    <div className="w-full mx-auto   py-10 px-5 rounded-lg -none">
      <h1 className="text-2xl font-semibold">{title}</h1>
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
          className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default BatteryForm;
