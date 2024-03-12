import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/appContext";
import React from "react";
import NotificationModal from "./NotificationModal";
import NotificationService from "../../services/NotificationService";
import { ReactComponent as Currency } from "../svg/CurrencySvg.svg";
import { ReactComponent as HomeSvg } from "../svg/HomeSvg.svg";
import { ReactComponent as InboxSvg } from "../svg/InboxSvg.svg";
import { ReactComponent as CustomerSvg } from "../svg/CustomerSvg.svg";
import { ReactComponent as StockSvg } from "../svg/StockSvg.svg";
import { ReactComponent as BatterySvg } from "../svg/BatterySvg.svg";
import { ReactComponent as UserSvg } from "../svg/UsersSvg.svg";
import { ReactComponent as SettingSvg } from "../svg/settingSvg.svg";
import { ReactComponent as LogoutSvg } from "../svg/LogoutSvg.svg";
import { ReactComponent as LeftSideArrow } from "../svg/arrow-left-circle.svg";
import { ReactComponent as RightSideArrow } from "../svg/arrow-right-circle.svg";
import logoImage from "../../img/logo_sideNav.png";
import admService from "../../services/AdminService";
const SideNav = () => {
  const authContext = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [notificationsModal, setNotificationsModal] = useState(false);
  const [toggleNavBar, setToggleNavBar] = useState(true);
  const { token } = authContext;
  const refreshEffect = authContext.refreshEffect;
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await NotificationService.getUnSeenNotification({
          headers: {
            Authorization: token,
          },
        });

        setNotifications(response.data.unseenList);
      } catch (e) {
        console.log(e);
      }
    };
    getNotifications();
  }, [token, refreshEffect]);

  console.log(notifications);
  const userLogoutHandler = () => {
    authContext.logout();
    console.log("handle logout");
  };
  const notificationsTableHandler = () => {
    setNotificationsModal(!notificationsModal);
  };
  const handleToggleNavBar = () => {
    setToggleNavBar((prev) => !prev);
  };
  return (
    <div
      className={`flex flex-col h-full px-3  text-slate-600 border-r-2 border-slate-300  shadow-4xl ${
        toggleNavBar ? "w-52" : "w-14"
      }`}
    >
      {notificationsModal && (
        <NotificationModal
          toggleNotification={notificationsTableHandler}
          list={notifications}
        />
      )}
      <div className="space-y-3">
        <div className="flex justify-between items-center mt-2 border-b-2 border-slate-400 ">
          <div>
            <img src={logoImage} className="w-20 h-20 mb-2" alt="logo" />
            {/* <h1>Kallyankar</h1> */}
          </div>
          <button onClick={handleToggleNavBar} className="mb-2">
            {!toggleNavBar && <RightSideArrow />}
            {toggleNavBar && <LeftSideArrow />}
          </button>
        </div>

        {toggleNavBar && (
          <div className="flex-1">
            <ul className=" pb-4 space-y-1 text-sm font-medium">
              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#7600dc" : "#f0f0f0",
                  })}
                >
                  <HomeSvg />
                  <span>Home</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/customers"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#7600dc" : "#f0f0f0",
                  })}
                >
                  <CustomerSvg />
                  <span>Customer</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to={`/admin-dashboard/${token}/payment`}
                  className="flex items-center p-2 space-x-3 rounded-md"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#7600dc" : "#f0f0f0",
                  })}
                >
                  <Currency />
                  <span>Billing</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/stock"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#7600dc" : "#f0f0f0",
                  })}
                >
                  <StockSvg />
                  <span>Stock</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/battery"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#7600dc" : "#f0f0f0",
                  })}
                >
                  <BatterySvg />
                  <span>Battery</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/users"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#7600dc" : "#f0f0f0",
                  })}
                >
                  <UserSvg />
                  <span>Users</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/settings"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  style={({ isActive }) => ({
                    color: isActive ? "#fff" : "#545e6f",
                    background: isActive ? "#7600dc" : "#f0f0f0",
                  })}
                >
                  <SettingSvg />
                  <span>Settings</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <div className="flex items-center p-2 space-x-3 rounded-md">
                  <InboxSvg />
                  <span>Inbox</span>
                  {notifications && (
                    <button
                      onClick={notificationsTableHandler}
                      className="bg-blue-500 text-white rounded-full w-6 h-6 text-center  font-bold"
                    >
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 text-center  font-bold">
                        {notifications.length}
                      </span>
                    </button>
                  )}
                </div>
              </li>
              <li className="rounded-sm">
                <button
                  onClick={userLogoutHandler}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <LogoutSvg />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default React.memo(SideNav);
