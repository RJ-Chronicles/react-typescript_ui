import api from "./api";
type StockItem = {
  name: string;
};
const postNewStockItem = async (stockItem: StockItem) => {
  const { data } = await api.post<StockItem>("stock-item/add", stockItem);
  return data;
};
const updateStockItemById = async (stockItem: StockItem, id: string) => {
  const { data } = await api.patch<StockItem>(
    "stock-item/update/" + id,
    stockItem
  );
  return data;
};
const deleteStockItemById = async (id: string) => {
  const { data } = await api.delete<StockItem>("stock-item/delete/" + id);
  return data;
};
const getStockItemList = async () => {
  const { data } = await api.get<StockItem[]>("stock-item/list");
  return data;
};

const getStockItemBystockId = async (id: string) => {
  const { data } = await api.get<StockItem>("stock-item/stock-items-by/" + id);
  return data;
};

export {
  postNewStockItem,
  updateStockItemById,
  deleteStockItemById,
  getStockItemList,
  getStockItemBystockId,
};
