import { useContext, useState } from "react";
import AuthContext from "../../context/appContext";
import ProductService from "../../services/ProductService";
import { PRODUCT_OPERATIONS } from "../static/operations";

const ProductForm = () => {
  const appContext = useContext(AuthContext);

  const { mode, initial_data } = appContext.formProps;
  const {
    name,
    type,
    serial_number,
    vehicle_name,
    vehicle_number,
    customer,
    GST,
    price,
  } = initial_data;
  const [product, setProduct] = useState({
    name,
    type,
    price,
    customer,
    GST,
    vehicle_name,
    vehicle_number,
    serial_number,
  });
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    product.GST = 18;
    product.price = 50000;
    console.log(product);
    const headers = {
      headers: {
        Authorization: appContext.token,
      },
    };
    appContext.storeCartItems((prev) => [...prev, product]);
    try {
      if (mode === PRODUCT_OPERATIONS.ADD_PRODUCT) {
        const response = await ProductService.submitProductDetails(
          { ...product },
          headers
        );
        console.log("record Save!", response);
      }
      appContext.refreshData();
      appContext.setModalVisible(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-full  bg-white px-5 rounded-lg lg:rounded-l-none">
      <form
        className="px-8 pt-6 pb-4 bg-white rounded"
        onSubmit={formSubmitHandler}
      >
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Battery Name
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Battery Name"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              value={product.name}
              required
            />
          </div>
          <div className="md:ml-2">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="type"
            >
              Battery Type
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="type"
              type="text"
              placeholder="Battery Type"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
              value={product.type}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="serial_number"
          >
            Serial Number
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="serial_number"
            type="text"
            placeholder="Serial Number"
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                serial_number: e.target.value,
              }))
            }
            value={product.serial_number}
            required
          />
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="vehicle_name"
            >
              Vehicle Name
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="vehicle_name"
              type="text"
              placeholder="Vehicle Name"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  vehicle_name: e.target.value,
                }))
              }
              value={product.vehicle_name}
              required
            />
          </div>
          <div className="md:ml-2">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="v_number"
            >
              Vehicle Number
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="v_number"
              type="text"
              placeholder="Vehicle Number"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  vehicle_number: e.target.value,
                }))
              }
              value={product.vehicle_number}
              required
            />
          </div>
        </div>
        <div className="mb-6 text-center">
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
