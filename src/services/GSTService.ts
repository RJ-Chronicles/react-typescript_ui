import axios from "axios";
import { Headers, GST, GSTPayload } from "../AppModel";
const GST_BASE_URL = "http://localhost:3001/gst/";
//const GST_BASE_URL = "https://kallyankar-api-service.onrender.com/gst/";
class GSTService {
  getGstList(headers: any) {
    return axios.get<GSTPayload>(GST_BASE_URL + "list", headers);
  }

  getGSTById(id: string, headers: Headers) {
    return axios.get(GST_BASE_URL + "seleted/" + id, headers);
  }
  deleteGSTItemById(id: string, headers: Headers) {
    return axios.delete(GST_BASE_URL + "delete/" + id, headers);
  }
  updateGSTItemById(gst: GST, id: string, headers: any) {
    return axios.patch(GST_BASE_URL + "update/" + id, gst, headers);
  }
  submitGSTRecord(gst: GST, headers: Headers) {
    return axios.post(GST_BASE_URL + "add", gst, headers);
  }
}

const GstService = new GSTService();
export default GstService;
