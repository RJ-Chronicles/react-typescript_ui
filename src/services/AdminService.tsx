import axios from "axios";

const ADMIN_BASE_URL = "http://localhost:3001/admin/";
// interface userType {

// }

class AdminServices {
  loginUser(username: string, password: string) {
    return axios.post(ADMIN_BASE_URL + "login", { email: username, password });
  }
  addNewUser(user: any, headers: any) {
    return axios.post(ADMIN_BASE_URL + "sign-up", user, headers);
  }
  updateUser(user: any, headers: any) {
    return axios.patch(ADMIN_BASE_URL + "sign-up", user, headers);
  }
  deleteUserById(id: string, headers: any) {
    console.log("inside the delete");
    return axios.delete(ADMIN_BASE_URL + "delete/" + id, headers);
  }
}
const admService = new AdminServices();
export default admService;
