import { useState, useContext } from "react";
import AdminService from "../../services/AdminService";
import AuthContext from "../../context/appContext";
import { USER_OPERATIONS } from "../static/operations";

const UserForm = () => {
  const authContext = useContext(AuthContext);
  const appContext = useContext(AuthContext);

  const { mode, initial_data } = appContext.formProps;
  const { email, role, name, createdBy, last_name } = initial_data;

  let defaultSelectRole = role;
  const [user, setUser] = useState({
    email: email,
    role: role,
    name: name,
    last_name: last_name,
    createdBy: createdBy,
  });

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    console.log(user);

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      };
      if (mode === USER_OPERATIONS.ADD_USER) {
        const password = passwordGenerator();
        const currentUser = authContext.user.name;

        await AdminService.addNewUser(
          { ...user, password, createdBy: currentUser },
          headers
        );
        authContext.refreshData();
      }
      if (mode === USER_OPERATIONS.UPDATE_USER) {
      }
      appContext.setModalVisible(false);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const passwordGenerator = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 8;
    let password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  };
  return (
    <div className="w-full  bg-white px-5 rounded-lg lg:rounded-l-none">
      <form
        className="px-8 pt-6 pb-4 bg-white rounded"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              User Name
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="User Name"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              value={user.name}
              required
            />
          </div>
          <div className="md:ml-2">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="l_name"
            >
              Last Name
            </label>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="l_name"
              type="text"
              placeholder="Last Name"
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  last_name: e.target.value,
                }))
              }
              value={user.last_name}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="email"
            required
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            id="email"
            placeholder="Username"
            value={user.email}
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="role"
          >
            Role
          </label>
          <select
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            defaultValue={defaultSelectRole}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, role: e.target.value }))
            }
            id="role"
          >
            <option value="DEFAULT">Choose a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
