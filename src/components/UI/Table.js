import { TABLE_SELECTION } from "../static/operations";
import CustomerTablePartial from "./partials/CustomerTablePartial";
import ProductTablePartial from "./partials/ProductTablePartial";
import UserTablePartial from "./partials/UserTablePartial";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { useState } from "react";
import { sortedList } from "../helper/helperFunctions";
const Table = (props) => {
  const { column, mode, list } = props;

  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedData, setSortedData] = useState(list);
  const handleClick = (e) => {
    let sortColumn = e.target.name.toLowerCase();
    sortColumn =
      sortColumn === "customer name"
        ? "name"
        : sortColumn === "registered"
        ? "createdAt"
        : sortColumn;

    const data = sortedList(list, sortColumn, sortDirection);
    const toggleDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(toggleDirection);
    console.log(data);
    setSortedData(data);
  };
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {column.map((col_name, index) => (
            <th key={index} scope="col" className={`px-3 py-3 w-64`}>
              <button
                className="flex flex-row"
                onClick={
                  ["CUSTOMER NAME", "EMAIL", "CONTACT", "REGISTERED"].includes(
                    col_name
                  )
                    ? handleClick
                    : () => {}
                }
                name={col_name}
              >
                {" "}
                {col_name}{" "}
                {["CUSTOMER NAME", "EMAIL", "CONTACT", "REGISTERED"].includes(
                  col_name
                ) && <UnfoldMoreIcon />}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      {mode === TABLE_SELECTION.CUSTOMER_TABLE && list !== undefined && (
        <CustomerTablePartial customerList={sortedData} />
      )}
      {mode === TABLE_SELECTION.USER_TABLE && list !== undefined && (
        <UserTablePartial userList={list} />
      )}
      {mode === TABLE_SELECTION.BATTERY_TABLE && list !== undefined && (
        <ProductTablePartial productList={list} />
      )}
    </table>
  );
};

export default Table;
