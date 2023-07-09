import { useEffect, useState, useContext } from "react";
import Spinner from "../UI/Spinner";
import AuthContext from "../../context/appContext";

import { CUSTOMER_TABLE_COLUMN } from "../static/table_headers";
import { CUSTOMER_OPERATIONS, TABLE_SELECTION } from "../static/operations";

import cstmerService from "../../services/CustomerService";
import Table from "../UI/Table";
import { filteredList } from "../helper/helperFunctions";
import Modal from "../UI/Modal";
import DeleteModal from "../UI/DeleteModal";
import { ReactComponent as Add } from "../svg/add.svg";
import Header from "../UI/Header";

const CustomerList = () => {
  const [userList, setUserList] = useState([]);
  const [globalUserList, setGlobalUserList] = useState([]);
  const appContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOption] = useState({
    filterOption: "",
    filterString: "",
  });
  const refreshEffect = appContext.refreshEffect;
  const authToken = appContext.token;
  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
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

  // const exportToCSV = (fileName) => {
  //   const csvData = userList;
  //   const fileType =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //   const fileExtension = ".xlsx";
  //   const ws = XLSX.utils.json_to_sheet(csvData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };
  const toggleModal = appContext.isModalVisible;
  const toggleDeleteModal = appContext.isDeleteModalVisible;

  return (
    <div className="md:min-h-screen  w-full">
      <Header>
        <h1 className="text-xl font-semibold font-sans">Customer Details </h1>
      </Header>

      <div className="mx-10">
        <div className="flex justify-between items-center">
          <button
            onClick={handleModalVisibility}
            className="flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10 "
          >
            <span>
              <Add />
            </span>
            <span>NEW</span>
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
        {<Spinner visible={isLoading} />}
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
    </div>
  );
};

export default CustomerList;

//`${CUSTOMER_BASE_URL}/customer-all?sort=${sort}&sortBy=${sortBy}&page=${page}&findBy=${findBy}`,
