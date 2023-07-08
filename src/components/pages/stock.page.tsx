import Modal from "@mui/material/Modal";
import * as React from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";

import StockElementForm from "../UI/Forms/StockElementForm";
import StockBoard from "../UI/StockBoard";
const Stock = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-full">
      <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 text-white md:pt-16 pt-10 ">
        <h1 className="text-center mt-0 mb-2 text-5xl font-medium leading-tight text-primary">
          Stock Analysis
        </h1>
        <p className="text-center font-normal text-xl">
          Stock analysis and screening tool for Kalyankar Batteries.
        </p>
        <div className="relative max-w-xl mx-auto my-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg outline-none  block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for product"
            required
          />
        </div>
        <div className=" flex items-end justify-end md:pb-8 pb-6 ">
          <Button onClick={handleOpen}>
            <AddCircleIcon sx={{ width: 40, height: 40 }} />
          </Button>
        </div>
      </div>

      {/* <div className="-translate-y-10 flex items-end justify-end">
        <Button onClick={handleOpen}>
          <AddCircleIcon />
        </Button>
      </div> */}

      {open && (
        <StockElementForm
          initialData={{
            battery_name: "",
            product_code: "",
            amphere_size: "",
            quantity: "0",
            mrp: "0",
            id: "",
          }}
          closeModal={handleClose}
          action={"ADD"}
          open={open}
        />
      )}

      <StockBoard />
    </div>
  );
};

export default Stock;
