import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/appContext";
import { useNavigate } from "react-router-dom";

import Spinner from "../UI/Spinner";
import ErrorToast from "../UI/ErrorToast";
import AdminService from "../../services/AdminService";
import NewLogo from "../../img/new_logo.png";
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
    <section className="min-h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center ">
          <div className="shrink-1 hidden md:block mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample "
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 ">
            <div className="flex flex-col justify-center md:w-2/3">
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0  mx-auto">
                <img src={NewLogo} className="w-full" alt="Sample " />
              </div>
              {<Spinner open={isLoading} />}
              {error && <ErrorToast error={error} />}
              <form
                className="w-full px-4  md:mx-0 "
                onSubmit={loginSubmitHandler}
              >
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
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
