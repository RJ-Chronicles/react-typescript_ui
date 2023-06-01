import { Outlet } from "react-router-dom";
import SideNav from "../UI/SideNav";
import { GreetingMessage } from "../helper/helperFunctions";
import AuthContext from "../../context/appContext";
import { useContext, useState } from "react";
const MainHeader = () => {
  const appContext = useContext(AuthContext);
  const [toggleNavBar, setToggleNavBar] = useState(true);
  const message = GreetingMessage();

  const handleToggleNavBar = () => {
    setToggleNavBar(!toggleNavBar);
  };
  return (
    <div className="bg-[#EEEEEE] flex ">
      <div className="flex shadow-mg bg-slate-200 text-slate-700 ">
        {toggleNavBar && <SideNav />}
        <div>
          <button onClick={handleToggleNavBar}>
            {!toggleNavBar && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-14 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
            {toggleNavBar && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
        {/* <div className="">
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <h2 className="text-base font-sans font-normal text-center ">
            {message + " "}
            {appContext.user.name.split(" ")[0]}
          </h2>
        </div> */}
      </div>
      <div className="flex w-full min-h-screen overflow-y: scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default MainHeader;
