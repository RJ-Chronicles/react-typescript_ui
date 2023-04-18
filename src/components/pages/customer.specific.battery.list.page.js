import { PRODUCT_OPERATIONS } from "../static/operations";

import { useEffect, useState, useContext } from "react";
import { BATTERY_TABLE_COLUMN } from "../static/table_headers";
//import Table from "../UI/Table";
import ProductService from "../../services/ProductService";
import HeaderCartButton from "../UI/cart/HeaderCartButton";
import AuthContext from "../../context/appContext";
import Modal from "../UI/Modal";
import DeleteModal from "../UI/DeleteModal";
import { useParams } from "react-router-dom";

const CustomerSpecificBatteryList = () => {
  let { customerId } = useParams();

  const appContext = useContext(AuthContext);
  const [productList, setProductList] = useState({});
  const token = appContext.token;

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    const fetchProductListByCustomerId = async () => {
      try {
        const response = await ProductService.getProductListBasedOnCustomerId(
          customerId,
          headers
        );
        setProductList(response.data);
        console.log(response.data.soldList);
      } catch (e) {
        console.log("Error occured", e);
      }
    };

    fetchProductListByCustomerId();
  }, [token]);

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

  const handleAddUpdateFormVisibility = (e) => {
    const id = e.target.name;
    const product = productList.soldList.find((el) => el._id === id);
    const initial_data = {
      ...product,
    };
    const mode = PRODUCT_OPERATIONS.UPDATE_PRODUCT;
    const title = "Edit Product Record";
    appContext.setFormProps({ initial_data, mode, title });
    appContext.setModalVisible(true);
  };

  const handleDeleteModalVisibility = (e) => {
    const id = e.target.name;
    const mode = PRODUCT_OPERATIONS.DELETE_PRODUCT;
    const title = "Are you sure you want to delete this Product?";
    appContext.setDeleteModalFormProps({ id, mode, title });
    appContext.setDeleteModalVisible(true);
  };

  // const handleCartOnclick = () => {
  //   console.log("clicked!");
  // };
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
            <HeaderCartButton numberOfCartItems={appContext.cartItems.length} />
          )}
        </div>
        {toggleModal && <Modal />}
        {toggleDeleteModal && <DeleteModal />}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {productList.soldList !== undefined && (
            <>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {BATTERY_TABLE_COLUMN.map((col_name, index) => (
                      <th key={index} scope="col" className={`px-3 py-3 w-64`}>
                        {col_name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productList.soldList.map((product, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-3 py-4">{product.name}</td>
                      <td className="px-3 py-4">{product.type}</td>
                      <td className="px-3 py-4">{product.serial_number}</td>

                      <td className="px-3 py-4">{product.price}</td>

                      <td className="flex items-center px-6 py-4 space-x-3">
                        <button
                          onClick={handleAddUpdateFormVisibility}
                          name={product._id}
                          className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={handleDeleteModalVisibility}
                          name={product._id}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <Table
                  list={productList.soldList}
                  column={BATTERY_TABLE_COLUMN}
                  mode={TABLE_SELECTION.BATTERY_TABLE}
                /> */}
            </>
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
