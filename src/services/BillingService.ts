import axios from "axios";
import { Headers, GST, Billing } from "../AppModel";
//const BILLING_BASE_URL = "http://localhost:3001/billing/";
const BILLING_BASE_URL = "https://kallyankar-api-service.onrender.com/gst/";
class BillingService {
  getBillingListByStatus(billing_status: string, headers: any) {
    console.log(billing_status);
    return axios.get(BILLING_BASE_URL + "get-list/" + billing_status, headers);
  }

  getBillingById(id: string, headers: Headers) {
    return axios.get(
      BILLING_BASE_URL + "customer-specific-list/" + id,
      headers
    );
  }
  deleteGSTItemById(id: string, headers: Headers) {
    return axios.delete(BILLING_BASE_URL + "delete/" + id, headers);
  }
  updateBillingById(billing: Billing, id: string, headers: any) {
    return axios.patch(BILLING_BASE_URL + "update/" + id, billing, headers);
  }
  submitBillingRecord(billing: any, headers: Headers) {
    return axios.post(BILLING_BASE_URL + "add", billing, headers);
  }
}

const billingService = new BillingService();
export default billingService;
