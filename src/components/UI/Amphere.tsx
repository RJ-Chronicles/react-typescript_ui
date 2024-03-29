import { useContext } from "react";

import AuthContext from "../../context/appContext";
import AmphereForm from "../UI/Forms/AmpereForm";
import { getFormatedDate } from "../helper/helperFunctions";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Modal from "@mui/material/Modal";
import DialogTitle from "@mui/material/DialogTitle";

import { ReactComponent as Delete } from "../svg/delete.svg";
import { ReactComponent as Edit } from "../svg/edit.svg";
import { ReactComponent as Add } from "../svg/add.svg";

import useApiCall from "../../hooks/useFetchAxios";
import { deleteAmphereById, getAmphereList } from "../../backend/amphere";
const Amphere = () => {
  const appContext = useContext(AuthContext);
  const refreshEffect = appContext.refreshEffect;
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState("ADD");
  const [id, setId] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [initial_data, setInitialData] = React.useState({
    size: "",
    id: "",
  });

  const params = React.useMemo(() => {
    return { refreshEffect };
  }, [refreshEffect]);
  const { data } = useApiCall(getAmphereList, params);

  const handleClose = () => {
    setOpen(false);
  };
  const deleteButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.name;
    setOpen(true);
    setId(id);
  };
  const itemDeleteHandler = async () => {
    deleteAmphereById(id);
    appContext.refreshData();
    setOpen(false);
  };

  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = () => {
    setAction("ADD");
    setInitialData({ size: "", id: "" });
    setOpenModal(true);
  };

  const updateButtonHandler = (e: any) => {
    const id = e.target.name;
    const ampr = data?.find((el) => el._id === id);
    const size = (ampr?.size || 0).toString();
    setInitialData({ size, id });
    setAction("UPDATE");
    setOpenModal(true);
  };

  return (
    <div className="md:min-h-screen  w-full">
      <div className="flex justify-end items-end mr-10">
        <button
          onClick={handleOpenModal}
          className="flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10 "
        >
          <span>
            <Add />
          </span>
          <span>NEW</span>
        </button>
      </div>

      <div className="relative  shadow-md sm:rounded-lg m-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Size in Amphere
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll w-full max-h-60">
            {data &&
              data?.map((obj, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b text-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4   text-gray-900 whitespace-nowrap dark:text-white">
                      {obj.size}
                    </td>
                    <td className="px-6 py-4">
                      {getFormatedDate(obj.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-left">
                      <button
                        name={obj._id}
                        onClick={updateButtonHandler}
                        className="font-medium text-blue-600 dark:text-red-500 hover:underline mr-1"
                      >
                        <Edit />
                      </button>

                      <button
                        name={obj._id}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline md:ml-1"
                        onClick={deleteButtonHandler}
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* -------------------------Delete Dialog-------------------   */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are sure sure want to delete this record"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={itemDeleteHandler} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
      {/* -------------------------Add/update Modal-------------------   */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="max-h-screen  mx-auto my-4 md:my-20 max-w-2xl">
          <div className="bg-white">
            <div className="flex justify-end pr-10 pt-10 ">
              <button
                className="hover:bg-slate-100 p-2"
                onClick={handleCloseModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <AmphereForm
              initialData={{ size: initial_data.size, id: initial_data.id }}
              closeModal={handleCloseModal}
              action={action}
            />
            <div className="flex justify-end pr-10 pb-10">
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Amphere;
