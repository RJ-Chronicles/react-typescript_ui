import axios from "axios";
import { Headers, Battery, BatteryPayload } from "../AppModel";
const BATTERY_BASE_URL = "http://localhost:3001/battery-type/";
//const BATTERY_BASE_URL =
//("https://kallyankar-api-service.onrender.com/battery-type/");
class BatteryServices {
  getListOfBatteries(headers: any) {
    return axios.get<BatteryPayload>(BATTERY_BASE_URL + "list", headers);
  }

  getBatteryById(id: string, headers: Headers) {
    return axios.get(BATTERY_BASE_URL + "seleted/" + id, headers);
  }
  deleteBatteryById(id: string, headers: Headers) {
    return axios.delete(BATTERY_BASE_URL + "delete/" + id, headers);
  }
  updateCustomerById(battery: Battery, id: string, headers: any) {
    return axios.patch(BATTERY_BASE_URL + "update/" + id, battery, headers);
  }
  submitBatteryDetails(battery: Battery, headers: Headers) {
    return axios.post(BATTERY_BASE_URL + "add", battery, headers);
  }
}

const btryService = new BatteryServices();
export default btryService;
