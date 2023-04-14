import Amphere from "../UI/Amphere";
import BatteryNames from "../UI/BatteryNames";
import GST from "../UI/GST";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};
const Battery = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="w-full mt-10">
      <div className="flex flex-col justify-center items-center md:flex-row space-x-10 md:space-x-0">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Amphere" {...a11yProps(0)} />
              <Tab label="Battery List" {...a11yProps(1)} />
              <Tab label="GST" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Amphere />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BatteryNames />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <GST />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Battery;
