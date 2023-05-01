import { useEffect, useState, useContext } from "react";

import AuthContext from "../../context/appContext";

import { CUSTOMER_TABLE_COLUMN } from "../static/table_headers";
import { CUSTOMER_OPERATIONS, TABLE_SELECTION } from "../static/operations";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import cstmerService from "../../services/CustomerService";
import Table from "../UI/Table";
import { filteredList } from "../helper/helperFunctions";
import Modal from "../UI/Modal";
import DeleteModal from "../UI/DeleteModal";
import Heading from "../UI/Heading";
const CustomerList = () => {
  const [userList, setUserList] = useState([]);
  const [globalUserList, setGlobalUserList] = useState([]);
  const appContext = useContext(AuthContext);
  const [filterOptions, setFilterOption] = useState({
    filterOption: "",
    filterString: "",
  });
  const refreshEffect = appContext.refreshEffect;
  const authToken = appContext.token;
  useEffect(() => {
    const fetchCustomeDetails = async () => {
      try {
        const headers = {
          headers: {
            Authorization: authToken,
          },
        };
        const responses = await cstmerService.getListOfCustomer(headers);
        const data = responses.data.customerList;
        setUserList(data);
        setGlobalUserList(data);
        console.log(data);
      } catch (e) {
        console.log("Error occured", e);
      }
    };
    fetchCustomeDetails();
  }, [authToken, refreshEffect]);

  const { filterOption, filterString } = filterOptions;
  useEffect(() => {
    if (filterOption !== "" && filterOption !== "DEFAULT") {
      const data = filteredList(globalUserList, filterString, filterOption);
      setUserList(data);
    }
    console.log("okay");
  }, [filterOption, filterString, globalUserList]);

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

  const exportToCSV = (fileName) => {
    const csvData = userList;
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
    <div className="md:min-h-screen  w-full">
      <Heading>
        <h1 className="text-center text-2xl font-bold uppercase">
          Customer Details 
        </h1>
      </Heading>

      <div className="flex justify-end items-end">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={(e) => exportToCSV("customerList")}
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
              className="block mb-2 text-sm font-bold text-gray-700 mr-6 mt-2"
              htmlFor="sort_by"
            >
              Filter By
            </label>
            <select
              className="w-full md:w-48 px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="sort_by"
              onChange={(e) =>
                setFilterOption((prev) => ({
                  ...prev,
                  filterOption: e.target.value,
                }))
              }
            >
              <option value="DEFAULT">Choose a filter option</option>
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
              placeholder="Filter value"
              onChange={(e) =>
                setFilterOption((prev) => ({
                  ...prev,
                  filterString: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>

      {toggleModal && <Modal />}
      {toggleDeleteModal && <DeleteModal />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {userList !== undefined && (
          <Table
            list={userList}
            column={CUSTOMER_TABLE_COLUMN}
            mode={TABLE_SELECTION.CUSTOMER_TABLE}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerList;

//`${CUSTOMER_BASE_URL}/customer-all?sort=${sort}&sortBy=${sortBy}&page=${page}&findBy=${findBy}`,
