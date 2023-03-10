import axios from "axios";
const PRODUCT_BASE_URL = "http://localhost:3001/product/";

class ProductService {
  getListOfProducts(headers: any) {
    return axios.get(PRODUCT_BASE_URL + "get-list", headers);
  }
  deleteProductById(id: string, header: any) {
    return axios.delete(PRODUCT_BASE_URL + "delete/" + id, header);
  }
  updateProductById(product: any, id: string, headers: any) {
    return axios.put(PRODUCT_BASE_URL + id + "/", product, headers);
  }
  submitProductDetails(product: any, headers: any) {
    return axios.post(PRODUCT_BASE_URL + "post", product, headers);
  }
  getProductListBasedOnCustomerId(id: string, headers: any) {
    return axios.get(
      PRODUCT_BASE_URL + "customer-specific-list/" + id,
      headers
    );
  }
}

const prdctService = new ProductService();
export default prdctService;
