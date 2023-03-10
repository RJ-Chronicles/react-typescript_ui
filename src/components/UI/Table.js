import { TABLE_SELECTION } from "../static/operations";
import CustomerTablePartial from "./partials/CustomerTablePartial";
import ProductTablePartial from "./partials/ProductTablePartial";
import UserTablePartial from "./partials/UserTablePartial";
const Table = (props) => {
  const { column, mode, list } = props;

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {column.map((col_name, index) => (
            <th key={index} scope="col" className={`px-3 py-3 w-64`}>
              {col_name}
            </th>
          ))}
        </tr>
      </thead>
      {mode === TABLE_SELECTION.CUSTOMER_TABLE && list !== undefined && (
        <CustomerTablePartial customerList={list} />
      )}
      {mode === TABLE_SELECTION.USER_TABLE && list !== undefined && (
        <UserTablePartial userList={list} />
      )}
      {mode === TABLE_SELECTION.BATTERY_TABLE && list !== undefined && (
        <ProductTablePartial productList={list} />
      )}
    </table>
  );
};

export default Table;
