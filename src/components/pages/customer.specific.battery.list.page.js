import { PRODUCT_OPERATIONS, TABLE_SELECTION } from "../static/operations";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useEffect, useState, useContext } from "react";
import { BATTERY_TABLE_COLUMN } from "../static/table_headers";
import Table from "../UI/Table";
import ProductService from "../../services/ProductService";
import CustomerService from "../../services/CustomerService";
import AuthContext from "../../context/appContext";
import Modal from "../UI/Modal";
import DeleteModal from "../UI/DeleteModal";
import { Link, useParams } from "react-router-dom";

const CustomerSpecificBatteryList = () => {
  let { customerId } = useParams();
  console.log(customerId);
  const appContext = useContext(AuthContext);
  const [productList, setProductList] = useState({});
  const [customer, setCustomer] = useState({});
  const [cartItems, setCartItems] = useState(appContext.cartItems);
  const token = appContext.token;
  const refreshEffect = appContext.refreshEffect;
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };

    const fetchCusterDetailsById = async () => {
      try {
        const userById = await CustomerService.getCustomerById(
          customerId,
          headers
        );
        setCustomer(userById.data);
      } catch (e) {
        console.log("Error : ", e);
      }
    };

    const fetchProductListByCustomerId = async () => {
      try {
        const products = await ProductService.getProductListBasedOnCustomerId(
          customerId,
          headers
        );
        setProductList(products.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCusterDetailsById();
    fetchProductListByCustomerId();
  }, [token, customerId, refreshEffect]);

  const handleModalVisibility = () => {
    const initial_data = {
      name: "",
      type: "",
      serial_number: "",
      GST: "",
      price: "",
      customer: customerId,
      vehicle_number: "",
      vehicle_name: "",
    };
    const mode = PRODUCT_OPERATIONS.ADD_PRODUCT;
    const title = "Fill Battery Details";
    appContext.setFormProps({ initial_data, mode, title });
    appContext.setModalVisible(true);
  };
  const toggleModal = appContext.isModalVisible;
  const toggleDeleteModal = appContext.isDeleteModalVisible;
  return (
    <>
      <div className="mx-6">
        <h1 className="text-center my-6 font-bold text-4xl">
          {" "}
          Sold Product Details
        </h1>

        <div className="flex items-center justify-between">
          <button
            onClick={handleModalVisibility}
            className="flex bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-10 w-44"
          >
            Add New Product
          </button>
          {appContext.cartItems.length > 0 && (
            <Tooltip title="procced to payment">
              <Link
                to={"/admin-dashboard/" + customerId + "/payment"}
                className="bg-gradient-to-r from-red-500 to-orange-500 rounded-md px-10 mx-4 flex justify-center"
              >
                <span className="translate-x-9 text-white font-bold rounded-full bg-blue-700 w-6 h-6 text-center">
                  {appContext.cartItems.length}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-12 h-12"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </Link>
            </Tooltip>
          )}
        </div>
        {toggleModal && <Modal />}
        {toggleDeleteModal && <DeleteModal />}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {productList.soldList !== undefined && (
            <Table
              list={productList.soldList}
              column={BATTERY_TABLE_COLUMN}
              mode={TABLE_SELECTION.BATTERY_TABLE}
            />
          )}
          {productList.soldList === undefined && (
            <h1 className="text-center font-bold">
              No Record For Given Customer
            </h1>
          )}
        </div>
      </div>
    </>
  );
};
export default CustomerSpecificBatteryList;
