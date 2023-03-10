import AuthContext from "../../context/appContext";
import { useContext } from "react";
import { NOTIFICATION_OPERATION } from "../static/operations";
import DeleteModal from "./DeleteModal";

const NotificationModal = (props) => {
  const { list, toggleNotification } = props;

  const appContext = useContext(AuthContext);
  const setShowHideTable = () => {
    toggleNotification();
  };

  const handleDeleteModalVisibility = (e) => {
    const id = e.target.name;
    const mode = NOTIFICATION_OPERATION.DELETE_NOTIFICATION;
    const title = "Are you sure you want to delete this Notification?";
    appContext.setDeleteModalFormProps({ id, mode, title });
    appContext.setDeleteModalVisible(true);
  };

  const toggleDeleteModal = appContext.isDeleteModalVisible;
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {toggleDeleteModal && <DeleteModal />}
      <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-3xl p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3">
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <table className="text-left w-full">
                <thead className="bg-gray-100 flex text-slate-600 w-full">
                  <tr className="flex w-full  shadow-md">
                    <th className="p-4 w-1/6 py-3  text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Mark As Read
                    </th>
                    <th className="p-4 w-1/5 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Contact
                    </th>
                    <th className="p-4 w-2/4 py-3  text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Message
                    </th>
                    <th className="p-4 w-1/5 py-3  text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full max-h-60">
                  {list.map((record, index) => (
                    <tr key={index} className="flex w-full  shadow-sm">
                      <td className="p-4 w-1/6">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </td>
                      <td className="p-4 w-1/5">{record.contact}</td>
                      <td className="p-4 w-2/4">{record.message}</td>
                      <td className="p-4 w-1/5">
                        <button
                          onClick={handleDeleteModalVisibility}
                          name={record._id}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  onClick={setShowHideTable}
                  className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
                >
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-red-600 group-hover:h-full opacity-90"></span>
                  <span className="relative group-hover:text-white">Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotificationModal;
