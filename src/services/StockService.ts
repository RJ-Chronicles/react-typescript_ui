import axios from "axios";
import { Headers, Stock, StockElementsPayload } from "../AppModel";
//const STOCK_BASE_URL = "http://localhost:3001/stock/";
const STOCK_BASE_URL = "https://kallyankar-api-service.onrender.com/stock/";
class StockService {
  fetchStockElements(headers: any) {
    return axios.get<StockElementsPayload>(STOCK_BASE_URL + "list", headers);
  }

  getSizeById(id: string, headers: Headers) {
    return axios.get(STOCK_BASE_URL + "seleted/" + id, headers);
  }
  deleteStockElementById(id: string, headers: Headers) {
    console.log("delete clicked");
    return axios.delete(STOCK_BASE_URL + "delete/" + id, headers);
  }
  updateSizeById(stock: Stock, id: string, headers: any) {
    return axios.patch(STOCK_BASE_URL + "update/" + id, stock, headers);
  }
  submiSizeDetails(stock: Stock, headers: Headers) {
    return axios.post(STOCK_BASE_URL + "add", stock, headers);
  }
}

const stockService = new StockService();
export default stockService;
