import axios from "axios";
import { useEffect, useState, useContext } from "react";

import AuthContext from "../../context/appContext";
import { filteredList, sortedList } from "../helper/helperFunctions";
import { CUSTOMER_BASE_URL } from "../static/api";
import { CUSTOMER_TABLE_COLUMN } from "../static/table_headers";
import { CUSTOMER_OPERATIONS, TABLE_SELECTION } from "../static/operations";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import CustomerTable from "../UI/CustomerTable";
import Table from "../UI/Table";

import Modal from "../UI/Modal";
import DeleteModal from "../UI/DeleteModal";
const CustomerList = () => {
  const [userList, setUserList] = useState({});
  const appContext = useContext(AuthContext);
  const [sortByValue, setSortBy] = useState("updatedAt");
  const refreshEffect = appContext.refreshEffect;

  const [paginationValues, setPaginationValues] = useState({
    page: 0,
    sort: "desc",
    sortBy: "updatedAt",
    start: 1,
    to: 4,
    total: 10,
    incrementDecrementBy: 4,
    findBy: "",
  });

  const { sort, sortBy, page, findBy } = paginationValues;
  const authToken = appContext.token;
  useEffect(() => {
    const fetchCustomeDetails = async () => {
      try {
        console.log("Loading");
        const response = await axios.get(`${CUSTOMER_BASE_URL}/customer-all`, {
          headers: {
            Authorization: authToken,
          },
        });
        if (response.status === 200) {
          const data = response.data;
          setUserList(data);
          console.log(data.customerList);
          setPaginationValues((prev) => ({
            ...prev,
            total: data.count,
          }));
        }
      } catch (e) {
        console.log(e);
        console.log("Error occured");
      }
    };
    fetchCustomeDetails();
  }, [sort, sortBy, page, authToken, refreshEffect, findBy]);

  const [storeData, setStoreData] = useState([]);
  useEffect(() => {
    if (userList.customerList) {
      setStoreData(sortedList(userList.customerList, sortByValue));
      console.log(storeData);
    }
  }, [sortByValue, userList, storeData]);

  const handleModalVisibility = () => {
    const initial_data = {
      name: "",
      address: "",
      contact: "",
      email: "",
      last_name: "",
    };
    const mode = CUSTOMER_OPERATIONS.ADD_CUSTOMER;
    const title = "Fill Customer Details";
    appContext.setFormProps({ initial_data, mode, title });
    appContext.setModalVisible(true);
  };

  const exportToCSV = (csvData, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  const toggleModal = appContext.isModalVisible;
  const toggleDeleteModal = appContext.isDeleteModalVisible;
  return (
    <div className="mx-6">
      <h1 className="text-center my-6 font-bold text-4xl uppercase">
        {" "}
        Customer Details
      </h1>
      <div className="flex justify-end items-end">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={(e) => exportToCSV(userList.customerList, "customerList")}
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Export to Excel</span>
        </button>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleModalVisibility}
          className="flex bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-10 w-44"
        >
          Add Customer
        </button>
        <div className="flex justify-between items-center">
          <div className="flex">
            <label
              className="block mb-2 text-sm font-bold text-gray-700 mr-6"
              htmlFor="sort_by"
            >
              Sort By
            </label>
            <select
              className="w-full md:w-48 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="sort_by"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="DEFAULT">Choose a role</option>
              <option value="name">Name</option>
              <option value="email">Eamil</option>
              <option value="contact">Contact</option>
            </select>
          </div>
          <div className="flex ml-10">
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="sort_value"
              type="text"
              placeholder="Sort value"
              onChange={(e) =>
                setPaginationValues((prev) => ({
                  ...prev,
                  findBy: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>

      {toggleModal && <Modal />}
      {toggleDeleteModal && <DeleteModal />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {userList.customerList !== undefined && (
          <Table
            list={userList.customerList}
            column={CUSTOMER_TABLE_COLUMN}
            mode={TABLE_SELECTION.CUSTOMER_TABLE}
          />
        )}
      </div>

      {/* <div className="mt-24 relative overflow-x-auto shadow-md sm:rounded-lg">
        {userList.customerList !== undefined && (
          <CustomerTable customerList={userList.customerList} />
        )}
      </div> */}
    </div>
  );
};

export default CustomerList;

//`${CUSTOMER_BASE_URL}/customer-all?sort=${sort}&sortBy=${sortBy}&page=${page}&findBy=${findBy}`,
