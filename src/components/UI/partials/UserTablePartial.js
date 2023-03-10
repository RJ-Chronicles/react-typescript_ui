import { USER_OPERATIONS } from "../../static/operations";
import AuthContext from "../../../context/appContext";
import { useContext } from "react";
const UserTablePartial = (props) => {
  const appContext = useContext(AuthContext);
  const { userList } = props;
  const loggeInUserId = appContext.user._id;
  const getFormatedDate = (timeStamp) => {
    const formatedDate = new Date(timeStamp).toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return formatedDate;
  };

  const handleAddUpdateFormVisibility = (e) => {
    const id = e.target.name;
    const user = userList.find((el) => el._id === id);
    const initial_data = {
      ...user,
    };
    const mode = USER_OPERATIONS.UPDATE_USER;
    const title = "Edit Customer Record";
    appContext.setFormProps({ initial_data, mode, title });
    appContext.setModalVisible(true);
  };

  const handleDeleteModalVisibility = (e) => {
    const id = e.target.name;
    const mode = USER_OPERATIONS.DELETE_USER;
    const title = "Are you sure you want to delete this USER?";
    appContext.setDeleteModalFormProps({ id, mode, title });
    appContext.setDeleteModalVisible(true);
  };

  return (
    <tbody>
      {userList.map((user, index) => (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="px-3 py-4">
            {user.name} {" " + user.last_name}
          </td>
          <td className="px-3 py-4">{user.email}</td>
          <td className="px-3 py-4">{user.role}</td>
          <td className="px-3 py-4">{user.createdBy}</td>
          <td className="px-3 py-4">{getFormatedDate(user.createdAt)}</td>
          <td className="flex items-center px-6 py-4 space-x-3">
            <button
              onClick={handleAddUpdateFormVisibility}
              name={user._id}
              className="font-medium text-blue-600 dark:text-red-500 hover:underline"
            >
              Edit
            </button>

            {loggeInUserId !== user._id && (
              <button
                onClick={handleDeleteModalVisibility}
                name={user._id}
                className="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Delete
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserTablePartial;
