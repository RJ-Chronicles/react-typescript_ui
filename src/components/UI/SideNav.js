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
  };
  const notificationsTableHandler = () => {
    setNotificationsModal(!notificationsModal);
  };
  const handleToggleNavBar = () => {
    setToggleNavBar((prev) => !prev);
  };
  return (
    <div
      className={`flex flex-col h-full px-3  text-blue-800 border-r-2 border-slate-300  shadow-4xl ${
        toggleNavBar ? "w-40" : "w-10"
      }`}
    >
      {notificationsModal && (
        <NotificationModal
          toggleNotification={notificationsTableHandler}
          list={notifications}
        />
      )}
      <div className="space-y-3">
        <div className="flex justify-end items-center mt-10">
          <button onClick={handleToggleNavBar}>
            {!toggleNavBar && <RightSideArrow />}
            {toggleNavBar && <LeftSideArrow />}
          </button>
        </div>

        {toggleNavBar && (
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm font-semibold">
              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <HomeSvg />
                  <span>Home</span>
                </NavLink>
              </li>
              <li className="rounded-sm">
                <NavLink
                  to="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
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
                </NavLink>
              </li>
              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/customers"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <CustomerSvg />
                  <span>Customer</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to={`/admin-dashboard/${token}/payment`}
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <Currency />
                  <span>Billing Status</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/stock"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <StockSvg />
                  <span>Stock</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/battery"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <BatterySvg />
                  <span>Battery</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/users"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <UserSvg />
                  <span>Users</span>
                </NavLink>
              </li>

              <li className="rounded-sm">
                <NavLink
                  to="/admin-dashboard/settings"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <SettingSvg />
                  <span>Settings</span>
                </NavLink>
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
