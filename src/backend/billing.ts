import api from "./api";

type Billing = {
  _id?: string;
  name: string;
  last_name: string;
  email: string;
  role: string;
};

const postNewBilling = async (billing: Billing) => {
  const { data } = await api.post<Billing>("billing/add", billing);
  return data;
};
const updateBillingById = async (billing: Billing, id: string) => {
  const { data } = await api.patch<Billing>("billing/update/" + id, billing);
  return data;
};
const deleteBillingById = async (id: string) => {
  const { data } = await api.delete<Billing>("billing/delete/" + id);
  return data;
};
const getBillingById = async (id: string) => {
  const { data } = await api.delete<Billing>(
    "billing/customer-specific-list/" + id
  );
  return data;
};
const getBillingList = async (id: string) => {
  const { data } = await api.get<Billing[]>("billing/get-list");
  return data;
};
const getBillingListByStatus = async ({ status }: { status: string }) => {
  const { data } = await api.post<Billing[]>(
    "billing/get-list-by-status/" + status
  );
  return data;
};

export {
  postNewBilling,
  updateBillingById,
  deleteBillingById,
  getBillingList,
  getBillingListByStatus,
  getBillingById,
};
