import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/appContext";
import { useNavigate } from "react-router-dom";

import Spinner from "../UI/Spinner";
import ErrorToast from "../UI/ErrorToast";
import AdminService from "../../services/AdminService";

type setErrorType = string | undefined;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<setErrorType>();

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const response = await AdminService.loginUser(username, password);
      //const response = await AdminLogin(username, password);
      if (response.status === 200) {
        const expirationTime = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        //authContext.sessionUserData(response.data.user);
        authContext.login(
          response.data.token,
          expirationTime.toISOString(),
          response.data.user
        );
        setIsLoading(false);
        navigate("/admin-dashboard");
      }
    } catch (e) {
      setIsLoading(false);
      setError(`Please provide valid credentials`);
    }
  };

  const hideErrorMessage = () => {
    setError(undefined);
  };
  const isLoggedIn = authContext.isLoggedIn;
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin-dashboard");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm min-h-screen my-4 mx-auto">
      <div>
        <img
          src="https://do-not-delete-bucket1.s3.ap-south-1.amazonaws.com/logo2.png"
          alt=""
          className="mx-auto mt-12"
        />
        {<Spinner visible={isLoading} height="80" width="80" />}
        {error && <ErrorToast error={error} />}
      </div>
      <hr className="my-6" />
      <form onSubmit={loginSubmitHandler}>
        {/* (event) => AdminLogin(event, username, password) */}
        <div className="form-group mb-6">
          <label
            htmlFor="exampleInputEmail2"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(event) => setUsername(event.target.value)}
            onFocus={hideErrorMessage}
          />
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="exampleInputPassword2"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputPassword2"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            onFocus={hideErrorMessage}
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Sign in
        </button>
        <div className="flex justify-end my-6">
          <NavLink
            to="/validate-email"
            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
          >
            Forgot password?
          </NavLink>
        </div>
      </form>
    </div>
  );
};
export default Login;
