import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { ReactComponent as CustomerIcon } from "../svg/slideshare.svg";
import { ReactComponent as RupeeIcon } from "../svg/rupee.svg";
import { ReactComponent as BatteryIcon } from "../svg/package.svg";
import { ReactComponent as CloudDownloadIcon } from "../svg/cloud-download.svg";
import { ReactComponent as StockIcon } from "../svg/layout.svg";
import AuthContext from "../../context/appContext";
import CloseIcon from "@mui/icons-material/Close";
import cstmerService from "../../services/CustomerService";
import { exportToCSV } from "../helper/helperFunctions";
import Spinner from "../UI/Spinner";
import prdctService from "../../services/ProductService";
import billingService from "../../services/BillingService";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
const Settings = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [password, setPassword] = React.useState("");
  const [confirmPsw, setConfirmPsw] = React.useState("");
  const appContext = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const authToken = appContext.token;

  const date = new Date()
    .toISOString()
    .replace("/", "-")
    .split("T")[0]
    .replace("/", "-");

  const downlaodCustomerRecords = async () => {
    setIsLoading(true);
    try {
      const headers = {
        headers: {
          Authorization: authToken,
        },
      };
      const responses = await cstmerService.getListOfCustomer(headers);
      const data = responses.data.customerList;
      console.log(data);

      exportToCSV("customer_data_" + date, data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("Error occured", e);
    }
  };

  const downlaodProductsRecords = async () => {
    setIsLoading(true);

    try {
      const headers = {
        headers: {
          Authorization: authToken,
        },
      };

      const responses = await prdctService.productListToExport(headers);
      const data = responses.data.soldList;
      console.log(data);
      exportToCSV("product_data_" + date, data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("Error occured", e);
    }
  };
  const downlaodBillingsRecords = async () => {
    setIsLoading(true);
    try {
      const headers = {
        headers: {
          Authorization: authToken,
        },
      };

      const responses = await billingService.getBillingListToExport(headers);
      const data = responses.data.billingList;
      exportToCSV("billing_data_" + date, data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("Error occured", e);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlePasswordFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPsw) {
      setOpen(true);
      setMessage("Pasword doesn't match!");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 8 characters!");
      setOpen(true);
      return;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <Spinner open={isLoading} />}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#600080",
          color: "white",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ color: "white" }}
            label="Change Password"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ color: "white" }}
            label="Change Username"
            {...a11yProps(1)}
          />
          <Tab sx={{ color: "white" }} label="export Data" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h1 className="text-center text-2xl my-10 font-bold">
          Change Password
        </h1>
        <div className="md:w-1/2 mx-auto">
          <Collapse sx={{ width: "100%" }} in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          </Collapse>
          <form
            className="px-8 py-20 md:px-16 pt-6  bg-white rounded shadow-md "
            onSubmit={handlePasswordFormSubmit}
          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                New Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                id="name"
                placeholder="New Password"
                value={password}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="password"
                required
                onChange={(e) => setConfirmPsw(e.target.value)}
                id="name"
                placeholder="Confirm password"
                value={confirmPsw}
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Change Username
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen mx-20">
          <div className="w-full ">
            <div className="bg-slate-200 m-4  rounded-sm text-[#EEA47F] pt-5 px-5">
              <div className="w-full flex justify-center items-center ">
                <CustomerIcon />
              </div>
              <p className="text-slate-700 font-semibold text-xl font-serif text-center">
                Export Customer Data
              </p>
              <div className="flex justify-center items-center h-full mx-6">
                <button
                  className="text-center flex align-bottom bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
                  type="button"
                  onClick={downlaodCustomerRecords}
                >
                  <CloudDownloadIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="bg-slate-200 m-4  rounded-sm text-[#EEA47F] pt-5 px-5">
              <div className="w-full flex justify-center items-center ">
                <RupeeIcon />
              </div>
              <p className="text-slate-700 font-semibold text-xl font-serif text-center">
                Export Billing Data
              </p>
              <div className="flex justify-center items-center h-full mx-6">
                <button
                  className="text-center flex align-bottom bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
                  type="button"
                  onClick={downlaodBillingsRecords}
                >
                  <CloudDownloadIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="bg-slate-200 m-4  rounded-sm text-[#EEA47F] pt-5 px-5">
              <div className="w-full flex justify-center items-center ">
                <BatteryIcon />
              </div>
              <p className="text-slate-700 font-semibold text-xl font-serif text-center upper">
                Export Products Data
              </p>
              <div className="flex  justify-center items-center h-full mx-6">
                <button
                  className="text-center flex align-bottom bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
                  type="button"
                  onClick={downlaodProductsRecords}
                >
                  <CloudDownloadIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="bg-slate-200 m-4  rounded-sm text-[#EEA47F] pt-5 px-5">
              <div className="w-full flex justify-center items-center ">
                <StockIcon />
              </div>
              <p className="text-slate-700 font-semibold text-xl font-serif text-center upper">
                Export Stock Data
              </p>
              <div className="flex justify-center items-center h-full mx-6">
                <button
                  className="text-center flex align-bottom bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
                  type="button"
                  onClick={downlaodProductsRecords}
                >
                  <CloudDownloadIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
};
export default Settings;
