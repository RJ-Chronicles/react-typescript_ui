import axios from "axios";
const CUSTOMER_BASE_URL =
  "https://kallyankar-api-service.onrender.com/customer/"; //"http://localhost:3001/customer/";

class CustomerService {
  getListOfCustomer(headers: any) {
    console.log("inside");
    return axios.get(CUSTOMER_BASE_URL + "customer-all", headers);
  }

  getCustomerById(id: string, headers: any) {
    return axios.get(CUSTOMER_BASE_URL + "seleted/" + id, headers);
  }
  deleteCustomerById(id: string, headers: any) {
    return axios.delete(CUSTOMER_BASE_URL + "delete/" + id, headers);
  }
  updateCustomerById(customer: any, id: string, headers: any) {
    return axios.patch(CUSTOMER_BASE_URL + "update/" + id, customer, headers);
  }
  submitCustomerDetails(customer: any, headers: any) {
    return axios.post(CUSTOMER_BASE_URL + "new-customer", customer, headers);
  }
}

const cstmerService = new CustomerService();
export default cstmerService;
