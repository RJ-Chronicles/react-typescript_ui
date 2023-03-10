import { PRODUCT_OPERATIONS, TABLE_SELECTION } from "../static/operations";

import { useEffect, useState, useContext } from "react";
import { BATTERY_TABLE_COLUMN } from "../static/table_headers";
import Table from "../UI/Table";
import ProductService from "../../services/ProductService";
import CustomerService from "../../services/CustomerService";
import AuthContext from "../../context/appContext";
import Modal from "../UI/Modal";
import DeleteModal from "../UI/DeleteModal";
import { useParams } from "react-router-dom";

const CustomerSpecificBatteryList = () => {
  let { customerId } = useParams();
  console.log(customerId);
  const appContext = useContext(AuthContext);
  const [productList, setProductList] = useState({});
  const [customer, setCustomer] = useState({});
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
          Sold Product Details of
        </h1>

        <div className="flex items-center justify-between">
          <button
            onClick={handleModalVisibility}
            className="flex bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-10 w-44"
          >
            Add New Product
          </button>
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
