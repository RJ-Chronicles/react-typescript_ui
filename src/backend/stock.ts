import api from "./api";

type Stock = {
  name: string;
};
const postNewStock = async (stock: Stock) => {
  const { data } = await api.post<Stock>("stock/add", stock);
  return data;
};

const postCheckStockAvailability = async (name: string, type: string) => {
  const { data } = await api.post<Stock>("stock/", { name, type });
  return data;
};
const updateStockById = async (stock: Stock, id: string) => {
  const { data } = await api.patch<Stock>("stock/update/" + id, stock);
  return data;
};
const deleteStockById = async (id: string) => {
  const { data } = await api.delete<Stock>("stock/delete/" + id);
  return data;
};
const getStockList = async () => {
  const { data } = await api.get<Stock[]>("stock/list");
  return data;
};

const getStockById = async (id: string) => {
  const { data } = await api.get<Stock>("stock/seleted/" + id);
  return data;
};

export {
  postNewStock,
  updateStockById,
  deleteStockById,
  getStockList,
  getStockById,
  postCheckStockAvailability,
};
