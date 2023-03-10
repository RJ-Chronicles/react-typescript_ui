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
function App() {
  const authContext = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landingpage />}></Route>
        {/* <Route path="/validate-email" element={<ResetEmail />}></Route>
        <Route path="/new-password" element={<NewPassword />}></Route> */}

        <Route path="/admin-login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={authContext.isLoggedIn ? <MainHeader /> : <Landingpage />}
        >
          <Route index element={<Dashboard />} />
          <Route path="/admin-dashboard/customers" element={<CustomerList />} />
          <Route path="/admin-dashboard/users" element={<UserList />} />
          <Route
            path="/admin-dashboard/battery/:customerId"
            element={<CustomerSpecificBatteryList />}
          />
          <Route path="/admin-dashboard/stock" element={<Stock />} />
          <Route path="/admin-dashboard/battery" element={<Battery />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
