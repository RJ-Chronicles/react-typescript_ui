import { PRODUCT_OPERATIONS } from "../static/operations";

import { useEffect, useState, useContext, useCallback } from "react";
import { BATTERY_TABLE_COLUMN } from "../static/table_headers";
import ProductService from "../../services/ProductService";
import HeaderCartButton from "../UI/cart/HeaderCartButton";
import AuthContext from "../../context/appContext";
import Modal from "../UI/Modal";
import DeleteModal from "../UI/DeleteModal";
import CartItems from "../UI/cart/CartItems";
import { useParams } from "react-router-dom";
import Spinner from "../UI/Spinner";
import Header from "../UI/Header";
import { ReactComponent as Delete } from "../svg/delete.svg";
import { ReactComponent as Edit } from "../svg/edit.svg";
import { ReactComponent as Add } from "../svg/add.svg";
const CustomerSpecificBatteryList = () => {
  let { customerId } = useParams();

  const appContext = useContext(AuthContext);
  const [productList, setProductList] = useState([]);
  const [shoCartModal, setShowCartModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = appContext.token;
  const refreshEffect = appContext.refreshEffect;

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };

    const fetchProductListByCustomerId = async () => {
      setIsLoading(true);
      try {
        if (customerId) {
          const response = await ProductService.getProductListBasedOnCustomerId(
            customerId,
            headers
          );
          setProductList(response.data);
          console.log("Calling Effect");
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log("Error occured", e);
      }
    };

    fetchProductListByCustomerId();
  }, [token, refreshEffect, customerId]);

  const handleModalVisibility = useCallback(() => {
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
  }, [appContext, customerId]);

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

  const handleShowCartModal = useCallback(() => {
    setShowCartModal(true);
  }, []);

  const handleHideCartModal = useCallback(() => {
    setShowCartModal(false);
  }, []);
  const toggleModal = appContext.isModalVisible;
  const toggleDeleteModal = appContext.isDeleteModalVisible;

  return (
    <div className="md:min-h-screen  w-full ">
      <Header>
        <h1 className="text-xl font-semibold font-sans">
          Sold product Details
        </h1>
      </Header>

      <div className="mx-10">
        <div className="flex items-center justify-between">
          <button
            onClick={handleModalVisibility}
            className="flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10 "
          >
            <span>
              <Add />
            </span>
            <span>NEW</span>
          </button>
          {appContext.cartItems.length > 0 && (
            <HeaderCartButton
              numberOfCartItems={appContext.cartItems.length}
              onClick={handleShowCartModal}
            />
          )}
          <CartItems
            open={shoCartModal}
            closeCartHandler={handleHideCartModal}
            customerId={customerId}
          />
        </div>
        {toggleModal && <Modal />}
        {toggleDeleteModal && <DeleteModal />}
        {<Spinner open={isLoading} />}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          {productList !== undefined && (
            <>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
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
                  {productList.map((product, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-3 py-4">{product.name}</td>
                      <td className="px-3 py-4">
                        {product.vehicle_name} {product.vehicle_number}
                      </td>
                      <td className="px-3 py-4">{product.type}</td>
                      <td className="px-3 py-4">{product.serial_number}</td>

                      <td className="px-3 py-4">{product.price}</td>
                      <td className="flex items-center px-2 py-4 space-x-3">
                        <button
                          onClick={handleAddUpdateFormVisibility}
                          name={product._id}
                          className="font-medium text-blue-600 dark:text-red-500 hover:underline"
                        >
                          <Edit />
                        </button>

                        <button
                          onClick={handleDeleteModalVisibility}
                          name={product._id}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          <Delete />
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
          {productList === undefined && (
            <h1 className="text-center font-bold">
              No Record For Given Customer
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default CustomerSpecificBatteryList;
