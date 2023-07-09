import axios from "axios";
import { Headers } from "../AppModel";
//const STOCK_ITEM_BASE_URL = "http://localhost:3001/stock-item/";
const STOCK_ITEM_BASE_URL =
  "https://kallyankar-api-service.onrender.com/stock-item/";

class StockItemService {
  submiStockItemDetails(stock: any, headers: Headers) {
    return axios.post(STOCK_ITEM_BASE_URL + "add", stock, headers);
  }

  fetchStockElements(headers: any) {
    return axios.get(STOCK_ITEM_BASE_URL + "list", headers);
  }

  fetchStockElementsByStockId(id: string, headers: any) {
    return axios.get(STOCK_ITEM_BASE_URL + "stock-items-by/" + id, headers);
  }

  deleteStockItemElementById(id: string, headers: Headers) {
    console.log("delete clicked");
    return axios.delete(STOCK_ITEM_BASE_URL + "delete/" + id, headers);
  }
  updateStockItemById(stock: any, id: string, headers: any) {
    return axios.patch(STOCK_ITEM_BASE_URL + "update/" + id, stock, headers);
  }
}

const stockItemService = new StockItemService();
export default stockItemService;
