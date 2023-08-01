import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/appContext";

import { USER_TABLE_COLUMN } from "../static/table_headers";

import Table from "../UI/Table";

import { TABLE_SELECTION, USER_OPERATIONS } from "../static/operations";
import Modal from "../UI/Modal";
import DeleteModal from "../UI/DeleteModal";
import admService from "../../services/AdminService";

import Spinner from "../UI/Spinner";
import Header from "../UI/Header";
import { ReactComponent as Add } from "../svg/add.svg";
const UserList = () => {
  const [userList, setUserList] = useState({});
  const appContext = useContext(AuthContext);
  const refreshEffect = appContext.refreshEffect;
  const [isLoading, setIsLoading] = useState(false);
  const authToken = appContext.token;

  useEffect(() => {
    const fetchCustomeDetails = async () => {
      try {
        setIsLoading(true);
        const headers = {
          headers: {
            Authorization: authToken,
          },
        };
        const response = await admService.getUserList(headers);
        //const response = await axios.get(`${ADMIN_BASE_URL}/user_list`, );
        const data = response.data;
        console.log(data);
        setUserList(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
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
    <div className="md:min-h-screen  w-full">
      <Header>
        <h1 className="text-2xl font-semibold">User Details</h1>
      </Header>
      <div className="mx-10">
        <h1 className="text-center my-6 font-bold text-4xl"> </h1>
        <button
          onClick={handleModalVisibility}
          className="flex space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10 "
        >
          <span>
            <Add />
          </span>
          <span>NEW</span>
        </button>
        {toggleModal && <Modal />}
        {toggleDeleteModal && <DeleteModal />}
        {<Spinner open={isLoading} />}
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
    </div>
  );
};

export default UserList;
