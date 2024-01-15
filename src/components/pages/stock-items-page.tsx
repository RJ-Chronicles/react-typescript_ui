import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stockItemService from "../../services/StockItemService";
import { Headers } from "../../AppModel";
import Header from "../UI/Header";
import AuthContext from "../../context/appContext";
import TablePagination from "@mui/material/TablePagination";
import { getFormatedDate } from "../helper/helperFunctions";
import Spinner from "../UI/Spinner";
import { ReactComponent as Add } from "../svg/add.svg";
import { ReactComponent as Edit } from "../svg/edit.svg";
const StockItemPage = () => {
  const appContext = useContext(AuthContext);
  const token = appContext.token;
  const refreshEffect = appContext.refreshEffect;
  const { stock_id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [stockItemList, setStockItemList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [operationMode, setOperationMode] = useState("");
  const [stockItemId, setStockItemId] = useState("");

  const [previousStockQuantity, setPreviousStockQuantity] = useState("");

  useEffect(() => {
    const headers: Headers = {
      headers: {
        Authorization: token,
      },
    };
    const getStockItemListByStockId = async () => {
      try {
        if (stock_id) {
          setIsLoading(true);
          const response = await stockItemService.fetchStockElementsByStockId(
            stock_id,
            headers
          );
          console.log(response);
          setStockItemList(response.data.stockItemList);
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("Error Ocured!");
      }
    };
    getStockItemListByStockId();
  }, [stock_id, token, refreshEffect]);

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

  const addNewItem = () => {
    setOperationMode("ADD");
    if (!showForm) setShowForm(true);
  };
  const stockItemSubmitHandler = async (e: any) => {
    e.preventDefault();
    console.log(quantity);
    try {
      const headers: Headers = {
        headers: {
          Authorization: token,
        },
      };
      setIsLoading(true);
      if (operationMode === "ADD") {
        const rspVal = await stockItemService.submiStockItemDetails(
          { quantity, stock: stock_id },
          headers
        );
        console.log(rspVal);
      } else {
        const rspVal = await stockItemService.updateStockItemById(
          { quantity, stock: stock_id, previousStockQuantity },
          stockItemId,
          headers
        );
        console.log(rspVal);
        setOperationMode("ADD");
        setQuantity("");
      }
      appContext.refreshData();
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("Error Ocuured!" + e);
    }
  };

  const updateStockItem = (e: any) => {
    setOperationMode("UPDATE");
    setQuantity(e.target.name);
    setStockItemId(e.target.id);
    setPreviousStockQuantity(e.target.name);
    if (!showForm) setShowForm(true);
  };
  return (
    <div className="md:min-h-screen  w-full">
      {isLoading && <Spinner open={isLoading} />}

      <Header>
        <h1 className="text-xl font-semibold font-sans">Stock Items Entries</h1>
      </Header>
      <div className="mx-10">
        <div className="flex justify-between items-center">
          <div className="flex justify-start w-full md:w-1/4">
            <button
              onClick={addNewItem}
              className="flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10 "
            >
              <span>
                <Add />
              </span>
              <span>NEW1</span>
            </button>
          </div>
          <div className="flex justify-start w-full">
            {showForm && (
              <form
                className="px-8 md:px-16 flex space-x-10"
                onSubmit={stockItemSubmitHandler}
              >
                <div className="flex justify-center items-center">
                  <input
                    className=" px-3 py-2 w-80 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    type="number"
                    required
                    id="name"
                    placeholder="Stock Item"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
                >
                  {operationMode === "ADD" ? "ADD" : "UPDATE"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="relative  shadow-md sm:rounded-lg  ">
          <table className="w-full text-sm text-left text-gray-700 tracking-wider">
            <thead className="text-xs md:text-sm text-gray-800 uppercase bg-gray-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Added At
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll w-full max-h-60">
              {(rowsPerPage > 0
                ? stockItemList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : stockItemList
              ).map((row: any, index: any) => (
                <tr
                  key={index}
                  className="bg-white border-b text-sm text-slate-700 font-normal hover:bg-gray-50 "
                >
                  <td className="px-6 py-4">{row.quantity}</td>
                  <td className="px-6 py-4">
                    {getFormatedDate(row.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    <button
                      onClick={updateStockItem}
                      name={row.quantity}
                      id={row._id}
                      className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                    >
                      <Edit />
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
                    count={stockItemList.length}
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
      </div>
    </div>
  );
};

export default StockItemPage;
