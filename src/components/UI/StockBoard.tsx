import { useContext, useEffect, useState } from "react";
import { Headers, StockElementsPayload } from "../../AppModel";
import AuthContext from "../../context/appContext";
import stockService from "../../services/StockService";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import Modal from "@mui/material/Modal";
import StockElementForm from "./Forms/StockElementForm";
import Spinner from "./Spinner";
interface UpdateRecord {
  battery_name: string;
  product_code: string;
  amphere_size: string;
  quantity: string;
  mrp: string;
  id: string;
}
const StockBoard = () => {
  const appContext = useContext(AuthContext);
  const token = appContext.token;
  const refreshEffect = appContext.refreshEffect;
  const [stockList, setStockList] = useState<StockElementsPayload>();
  const [id, setId] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState<UpdateRecord>({
    battery_name: "",
    product_code: "",
    amphere_size: "",
    quantity: "",
    mrp: "",
    id: "",
  });

  useEffect(() => {
    const headers: Headers = {
      headers: {
        Authorization: token,
      },
    };
    const stockData = async () => {
      try {
        setIsLoading(true);
        const response = await stockService.fetchStockElements(headers);
        setStockList(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log("Error : " + err);
      }
    };
    stockData();
  }, [token, refreshEffect]);

  const itemDeleteHandler = async () => {
    if (id.length > 0) {
      const headers: Headers = {
        headers: {
          Authorization: token,
        },
      };
      await stockService.deleteStockElementById(id, headers);
      appContext.refreshData();
    }
    setOpenDeleteDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const deleteButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.name;
    console.log(id);
    setOpenDeleteDialog(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (data: any) => {
    console.log("data to update");
    const dt = {
      battery_name: data.battery_name,
      product_code: data.product_code,
      amphere_size: data.amphere_size,
      quantity: data.quantity,
      mrp: data.mrp,
      id: data._id,
    };
    setDataToUpdate(dt);
    setOpenModal(true);
  };
  return (
    <div className="relative  shadow-md sm:rounded-lg m-10">
      {<Spinner visible={isLoading} height="120" width="120" />}
      <table className="w-full text-sm  text-left text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Battery Name
            </th>
            <th scope="col" className="px-6 py-3">
              Product Code
            </th>
            <th scope="col" className="px-6 py-3">
              Amphere Size
            </th>
            <th scope="col" className="px-6 py-3">
              Available
            </th>
            <th scope="col" className="px-6 py-3">
              GST
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {stockList?.list?.map((rec, index: any) => {
            let animation =
              rec.quantity < 30
                ? "animate-pulse duration-700  font-bold text-red-600"
                : undefined;
            return (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{rec.battery_name}</td>
                <td className="px-6 py-4">{rec.product_code}</td>
                <td className="px-6 py-4">{rec.amphere_size}</td>

                <td className="px-6 py-4">
                  <span className={animation}>{rec.quantity}</span>
                </td>
                <td className="px-6 py-4">{rec.mrp}</td>
                <td className="flex items-center px-6 py-4 space-x-3">
                  <button
                    onClick={(e: any) => handleOpenModal(rec)}
                    name={rec._id}
                    className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={deleteButtonHandler}
                    name={rec._id}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* -------------------------Delete Dialog-------------------   */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are sure sure want to delete this record"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={itemDeleteHandler} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

      {/* -------------------------Add Modal-------------------   */}
      {openModal && (
        <StockElementForm
          initialData={dataToUpdate}
          closeModal={handleCloseModal}
          action={"UPDATE"}
          open={openModal}
        />
      )}
    </div>
  );
};

export default StockBoard;

/* <Card variant="outlined">
              <div
                key={index}
                className="w-36 h-36 hover:scale-105 duration-300  text-left "
              >
                <div className=" h-8 w-full bg-slate-200">

                  <hr />
                </div>
                <div className="p-2 group hover:bg-gradient-to-r from-cyan-500 to-blue-500">
                  <h1 className="text-base font-semibold text-slate-600 font-serif group-hover:text-white">
                    {rec.battery_name}
                  </h1>
                  <h2 className="text-sm group-hover:text-white text-slate-500 font-sans">
                    {rec.product_code}
                  </h2>
                  <div className="flex justify-between items-center my-1 space-x-4">
                    <p className="flex flex-row space-x-1 group-hover:text-white">
                      <span>{rec.amphere_size}</span>
                      <span>
                        <RightCheck />
                      </span>
                    </p>
                    <p className="flex flex-row space-x-1 group-hover:text-white">
                      <span>{rec.quantity}</span>
                      <span>
                        <RightCheck />
                      </span>
                    </p>
                  </div>
                  <button className="text-sm">Add</button>
                </div>
              </div>
</Card> */

// {stockList?.list?.map((rec, index: any) => {
//   let animation =
//     rec.quantity < 30
//       ? "animate-pulse duration-300 bg-red-500 rounded-full"
//       : "bg-green-500 rounded-sm";
//   return (
//     <div
//       key={index}
//       className="flex mx-2 flex-col my-2 space-y-6 md:space-y-0 md:space-x-6 md:flex-row"
//     >
//       <div className="bg-slate-700 rounded-xl text-white">
//         <div className="p-2 mx-2 mt-2 rounded-t-xl bg-slate-800">
//           <div className="text-center uppercase text-sm">
//             {rec.battery_name}
//           </div>
//           <h2 className="font-serif text-base text-center">
//             {rec.product_code}
//           </h2>
//           <h3 className="mt-2 text-center text-sm">{rec.amphere_size}</h3>
//           <div className="flex justify-center">
//             <button className="inline-block px-4 py-2 my-2 text-center border border-violet-600 rounded-lg duration-200 hover:bg-violet-800 hover:border-violet-800">
//               Add to Stock
//             </button>
//           </div>
//         </div>

//         <div className="border-t border-slate-700"></div>

//         <div className="p-4 mx-2 mb-2 rounded-b-xl bg-slate-800">
//           <div className="flex flex-col space-y-2">
//             <div className="flex justify-center">
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   fill="none"
//   viewBox="0 0 24 24"
//   strokeWidth={1.5}
//   stroke="currentColor"
//   className={"w-6 h-6 " + animation}
// >
//   <path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     d="M4.5 12.75l6 6 9-13.5"
//   />
// </svg>

//               <span className="text-sm ml-1">
//                 {rec.quantity} items in stock
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// })}
