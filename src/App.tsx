import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Landingpage from "./components/pages/landing.page";
import Login from "./components/pages/login.page";
//import ResetEmail from "./components/pages/admin/ResetEmail";
// import NewPassword from "./components/pages/admin/NewPassword";
import Stock from "./components/pages/stock.page";
import Dashboard from "./components/pages/dashboard.page";
import CustomerList from "./components/pages/customer.list.page";
import MainHeader from "./components/pages/MainHeader";
import Battery from "./components/pages/battery.page";
import AuthContext from "./context/appContext";
import UserList from "./components/pages/UserList";
import CustomerSpecificBatteryList from "./components/pages/customer.specific.battery.list.page";
import Settings from "./components/pages/setting.page";
import BillingStatusPage from "./components/pages/bill.status.page";
import StockItemPage from "./components/pages/stock-items-page";

function App() {
  const authContext = useContext(AuthContext);
  const token = authContext.token;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landingpage />}></Route>
        <Route path="/admin-login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={authContext.isLoggedIn ? <MainHeader /> : <Landingpage />}
        >
          <Route path="/admin-dashboard" index element={<Dashboard />} />
          <Route path="/admin-dashboard/customers" element={<CustomerList />} />
          <Route path="/admin-dashboard/users" element={<UserList />} />
          <Route
            path="/admin-dashboard/customers/:customerId"
            element={<CustomerSpecificBatteryList />}
          />
          <Route path="/admin-dashboard/stock" element={<Stock />} />
          <Route
            path="/admin-dashboard/stock/:stock_id"
            element={<StockItemPage />}
          />
          <Route path="/admin-dashboard/battery" element={<Battery />} />
          <Route
            path={`/admin-dashboard/${token}/payment`}
            element={<BillingStatusPage />}
          />
          <Route path="/admin-dashboard/settings" element={<Settings />} />
        </Route>
        <Route path="/*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
