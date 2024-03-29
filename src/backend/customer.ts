import api from "./api";

type Customer = {
  _id?: string;
  name: string;
  last_name: string;
  email: string;
  role: string;
};

const postNewCustomer = async (customer: Customer) => {
  const { data } = await api.post<Customer>("adamin/add", customer);
  return data;
};
const updateCustomerById = async (customer: Customer, id: string) => {
  const { data } = await api.patch<Customer>("customer/update/" + id, customer);
  return data;
};
const updateCustomerBillingStatus = async (customer: Customer, id: string) => {
  const { data } = await api.patch<Customer[]>(
    "customer/billing-status/" + id,
    customer
  );
  return data;
};
const deleteCustomerById = async (id: string) => {
  const { data } = await api.delete<Customer>("customer/delete/" + id);
  return data;
};
const getCustomerById = async (id: string) => {
  const { data } = await api.get<Customer>("customer/seleted/" + id);
  return data;
};
const getCustomerByBillingStatus = async (status: string) => {
  const { data } = await api.get<Customer[]>(
    "customer/billing-status/" + status
  );
  return data;
};
const getCustomerList = async () => {
  const { data } = await api.get<Customer[]>("customer/customer-all");
  return data;
};

const logoutCustomer = async (token: string, email: string) => {
  const { data } = await api.post<Customer>("customer/logout", {
    email,
    token,
  });
  return data;
};

export {
  getCustomerById,
  postNewCustomer,
  updateCustomerById,
  deleteCustomerById,
  getCustomerList,
  logoutCustomer,
  getCustomerByBillingStatus,
  updateCustomerBillingStatus,
};
