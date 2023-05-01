import axios from "axios";

const NOTIFICATION_BASE_URL = "http://localhost:3001/inquiry/";
//const NOTIFICATION_BASE_URL =
//"https://kallyankar-api-service.onrender.com/inquiry/";
class NotificationService {
  sendNotifiction(notification: any) {
    return axios.post(NOTIFICATION_BASE_URL + "post", notification);
  }
  deleteNotificationById(id: string, header: any) {
    return axios.delete(NOTIFICATION_BASE_URL + "delete/" + id, header);
  }
  getUnSeenNotification(header: any) {
    return axios.get(NOTIFICATION_BASE_URL + "get-unseen/", header);
  }
}
const ntfctnService = new NotificationService();
export default ntfctnService;
