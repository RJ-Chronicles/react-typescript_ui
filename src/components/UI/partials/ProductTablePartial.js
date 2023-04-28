import { PRODUCT_OPERATIONS } from "../../static/operations";
import { useContext } from "react";
import AuthContext from "../../../context/appContext";

const ProductTablePartial = (props) => {
  const { productList } = props;
  const appContext = useContext(AuthContext);
  const handleAddUpdateFormVisibility = (e) => {
    const id = e.target.name;
    const product = productList.find((el) => el._id === id);
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
  return (
    <tbody>
      {productList.map((product, index) => (
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
  );
};

export default ProductTablePartial;
