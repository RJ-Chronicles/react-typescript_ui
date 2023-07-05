import { Outlet } from "react-router-dom";
import SideNav from "../UI/SideNav";
const MainHeader = () => {
  return (
    <div className="bg-[#EEEEEE] flex ">
      <div className="flex shadow-mg bg-slate-200 text-slate-700 ">
        <SideNav />
      </div>
      <div className="flex w-full min-h-screen overflow-y: scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default MainHeader;
