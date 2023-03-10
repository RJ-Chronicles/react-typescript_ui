import axios from "axios";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/appContext";

import { ADMIN_BASE_URL } from "../static/api";
import { USER_TABLE_COLUMN } from "../static/table_headers";

import Table from "../UI/Table";

import { TABLE_SELECTION, USER_OPERATIONS } from "../static/operations";
import Modal from "../UI/Modal";
import DeleteModal from "../UI/DeleteModal";

const UserList = () => {
  const [userList, setUserList] = useState({});
  const appContext = useContext(AuthContext);
  const refreshEffect = appContext.refreshEffect;

  const authToken = appContext.token;

  useEffect(() => {
    const fetchCustomeDetails = async () => {
      try {
        const response = await axios.get(`${ADMIN_BASE_URL}/user_list`, {
          headers: {
            Authorization: authToken,
          },
        });
        if (response.status === 200) {
          const data = response.data;
          setUserList(data);
        }
      } catch (e) {
        console.log("Error occured");
      }
    };
    fetchCustomeDetails();
  }, [authToken, refreshEffect]);

  const handleModalVisibility = () => {
    const initial_data = {
      email: "",
      role: "",
      name: "",
      createdBy: "",
      last_name: "",
    };
    const mode = USER_OPERATIONS.ADD_USER;
    const title = "Fill User Details";

    appContext.setFormProps({ initial_data, mode, title });
    appContext.setModalVisible(true);
  };
  const toggleModal = appContext.isModalVisible;
  const toggleDeleteModal = appContext.isDeleteModalVisible;

  return (
    <div className="mx-6">
      <h1 className="text-center my-6 font-bold text-4xl"> User Details</h1>
      <button
        onClick={handleModalVisibility}
        className="flex bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-10 w-44"
      >
        Add New User
      </button>
      {toggleModal && <Modal />}
      {toggleDeleteModal && <DeleteModal />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {userList !== undefined && (
          <Table
            list={userList.userList}
            column={USER_TABLE_COLUMN}
            mode={TABLE_SELECTION.USER_TABLE}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
