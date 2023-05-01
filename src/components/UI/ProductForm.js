import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/appContext";
import ProductService from "../../services/ProductService";
import { PRODUCT_OPERATIONS } from "../static/operations";
import amprService from "../../services/AmphereService";
import btryService from "../../services/BatteryService";
import GstService from "../../services/GSTService";

const ProductForm = () => {
  const appContext = useContext(AuthContext);
  const authToken = appContext.token;
  const { mode, initial_data } = appContext.formProps;
  console.log(initial_data);
  const [batteryList, setBatteryList] = useState();
  const [amphere, setAmphere] = useState();
  const [gstList, setGstList] = useState();

  const {
    name,
    type,
    serial_number,
    vehicle_name,
    vehicle_number,
    customer,
    GST,
    price,
    _id,
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
    const headers = {
      headers: {
        Authorization: appContext.token,
      },
    };

    try {
      if (mode === PRODUCT_OPERATIONS.ADD_PRODUCT) {
        appContext.storeCartItems((prev) => [...prev, product]);
      } else {
        await ProductService.updateProductById(product, _id, headers);
      }
      appContext.refreshData();
      appContext.setModalVisible(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: authToken,
      },
    };
    const fetchBatteryList = async () => {
      const response = await btryService.getListOfBatteries(headers);
      setBatteryList(response.data);
      console.log(response.data);
    };
    const fetchSizeList = async () => {
      const response = await amprService.getListOfAvailableSize(headers);
      setAmphere(response.data);
    };
    const fetchGSTList = async () => {
      const response = await GstService.getGstList(headers);
      setGstList(response.data);
    };
    fetchGSTList();
    fetchSizeList();
    fetchBatteryList();
  }, [authToken]);
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
              htmlFor="role"
            >
              Battery Name
            </label>
            <select
              className="w-full px-6 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              value={product.name}
              id="role"
            >
              <option value="DEFAULT">Choose battery name</option>
              {batteryList?.list.map((data, index) => {
                return (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="md:ml-2">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="role"
            >
              Amphere Size
            </label>
            <select
              className="w-full px-9 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="size"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
              value={product.type}
            >
              <option value="DEFAULT">Choose battery size</option>
              {amphere?.list.map((data, index) => {
                return (
                  <option key={index} value={data.size}>
                    {data.size}
                  </option>
                );
              })}
            </select>
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
              htmlFor="role"
            >
              Battery Name
            </label>
            <select
              className="w-full px-9 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  GST: e.target.value,
                }))
              }
              value={product.GST}
              id="role"
            >
              <option value="DEFAULT">Choose GST value</option>
              {gstList?.list.map((data, index) => {
                return (
                  <option key={index} value={data.gst}>
                    {data.gst}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="md:ml-2">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="v_number"
            >
              Price
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="v_number"
              type="text"
              placeholder="Price"
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              value={product.price}
              required
            />
          </div>
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
