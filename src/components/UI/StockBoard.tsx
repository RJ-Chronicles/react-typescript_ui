import { useContext, useEffect, useState } from "react";
import { Headers } from "../../AppModel";
import AuthContext from "../../context/appContext";
import stockService from "../../services/StockService";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import StockElementForm from "./Forms/StockElementForm";
import Spinner from "./Spinner";
import { ReactComponent as Delete } from "../svg/delete.svg";
import { ReactComponent as Edit } from "../svg/edit.svg";
import { ReactComponent as CirclePlus } from "../svg/circle-plus.svg";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Add } from "../svg/add.svg";
interface UpdateRecord {
  battery_name: string;
  product_code: string;
  amphere_size: string;
  available: string;
  id: string;
}
const StockBoard = () => {
  const appContext = useContext(AuthContext);
  const token = appContext.token;
  const refreshEffect = appContext.refreshEffect;
  const [stockList, setStockList] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [dataToUpdate, setDataToUpdate] = useState<UpdateRecord>({
    battery_name: "",
    product_code: "",
    amphere_size: "",
    available: "",
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
        setStockList(response.data.list);
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
    console.log(data);
    const dt = {
      battery_name: data.battery_name,
      product_code: data.product_code,
      amphere_size: data.amphere_size,
      available: data.available,
      id: data._id,
    };
    setDataToUpdate(dt);
    setOpenModal(true);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stockItemsHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const id = event.currentTarget.id;
    console.log(id);
    navigate("/admin-dashboard/stock/" + id);
  };
  return (
    <div className="relative  shadow-md sm:rounded-lg m-10">
      {<Spinner visible={isLoading} height="120" width="120" />}

      <div className="relative  shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left text-gray-700 tracking-wider">
          <thead className="text-xs md:text-sm text-gray-800 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Add Entry
              </th>
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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll w-full max-h-60">
            {(rowsPerPage > 0
              ? stockList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : stockList
            ).map((row: any, index: any) => (
              <tr
                key={index}
                className="bg-white border-b text-sm text-slate-700 font-normal hover:bg-gray-50 "
              >
                <td className="px-6 py-4">
                  {" "}
                  <button
                    onClick={stockItemsHandler}
                    id={row._id}
                    className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    <CirclePlus />
                  </button>
                </td>

                <td className="px-6 py-4">{row.battery_name}</td>
                <td className="px-6 py-4">{row.product_code}</td>
                <td className="px-6 py-4">{row.amphere_size}</td>

                <td className="px-6 py-4">
                  <span>{row.available}</span>
                </td>

                <td className="flex items-center px-4 py-4 space-x-2">
                  <button
                    onClick={(e: any) => handleOpenModal(row)}
                    name={row._id}
                    className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={deleteButtonHandler}
                    name={row._id}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="w-full mx-auto">
              <td colSpan={6} className="mx-auto  w-full">
                <TablePagination
                  className="w-full"
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={stockList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

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
