import { CUSTOMER_OPERATIONS } from "../static/operations";
import AuthContext from "../../context/appContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

const CustomerTable = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [sordDirection, setSortDirection] = React.useState("ASC");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const appContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { customerList } = props;

  const handleAddUpdateFormVisibility = (e) => {
    const id = e.target.name;
    const cust = customerList.find((el) => el._id === id);
    const initial_data = {
      ...cust,
    };
    const mode = CUSTOMER_OPERATIONS.UPDATE_CUSTOMER;
    const title = "Edit Customer Record";
    appContext.setFormProps({ initial_data, mode, title });
    appContext.setModalVisible(true);
  };

  const handleDeleteModalVisibility = (e) => {
    const id = e.target.name;
    const mode = CUSTOMER_OPERATIONS.DELETE_CUSTOMER;
    const title = "Are you sure you want to delete this customer?";
    appContext.setDeleteModalFormProps({ id, mode, title });
    appContext.setDeleteModalVisible(true);
  };
  const handleBatteryListNavigation = (id) => {
    console.log("Handle Check ", id);
    navigate("/admin-dashboard/battery/" + id);
  };

  const changeSortDirection = () => {
    if (sordDirection === "ASC") {
      setSortDirection("DESC");
    } else {
      setSortDirection("ASC");
    }
  };
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <td onClick={changeSortDirection}>
            <span>
              {sordDirection === "ASC" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                  />
                </svg>
              )}
              CUSTOMER NAME
            </span>
          </td>
          <td>CUSTOMER ADDRESS</td>
          <td>EMAIL</td>
          <td>CONTACT</td>
          <td>ACTION</td>
        </tr>
      </thead>
      <tbody>
        {customerList
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((customer, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-3 py-4 ">
                {" "}
                <input
                  type="checkbox"
                  className="w-4 h-4 mx-2"
                  onChange={() => handleBatteryListNavigation(customer._id)}
                />
                {`${customer.name} ${customer.last_name}`}
              </td>
              <td className="px-3 py-4">{customer.address}</td>
              <td className="px-3 py-4">{customer.email}</td>
              <td className="px-3 py-4">{customer.contact}</td>

              <td className="flex items-center px-3 py-4 space-x-3">
                <button
                  onClick={handleAddUpdateFormVisibility}
                  name={customer._id}
                  className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteModalVisibility}
                  name={customer._id}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
      <tbody>
        <td colSpan={3}>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={customerList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </td>
      </tbody>
    </table>
  );
};

export default CustomerTable;
