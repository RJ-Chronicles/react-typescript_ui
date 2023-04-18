import axios from "axios";
import { Headers, Amphere, AmpherePayload } from "../AppModel";
//const AMPHERE_BASE_URL = "http://localhost:3001/amphere/";
const AMPHERE_BASE_URL = "https://kallyankar-api-service.onrender.com/amphere/";
class AmpherService {
  getListOfAvailableSize(headers: any) {
    console.log("gel list ");
    return axios.get<AmpherePayload>(AMPHERE_BASE_URL + "list", headers);
  }

  getSizeById(id: string, headers: Headers) {
    return axios.get(AMPHERE_BASE_URL + "seleted/" + id, headers);
  }
  deleteSizeById(id: string, headers: Headers) {
    return axios.delete(AMPHERE_BASE_URL + "delete/" + id, headers);
  }
  updateSizeById(battery: Amphere, id: string, headers: any) {
    return axios.patch(AMPHERE_BASE_URL + "update/" + id, battery, headers);
  }
  submiSizeDetails(battery: Amphere, headers: Headers) {
    return axios.post(AMPHERE_BASE_URL + "add", battery, headers);
  }
}

const amprService = new AmpherService();
export default amprService;
