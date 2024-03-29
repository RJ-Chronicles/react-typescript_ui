import api from "./api";

type User = {
  _id?: string;
  name: string;
  last_name: string;
  email: string;
  role: string;
};

const postNewUser = async (user: User) => {
  const { data } = await api.post<User>("adamin/sign-up", user);
  return data;
};
const updateUserById = async (user: User, id: string) => {
  const { data } = await api.patch<User>("admin/sign-up/" + id, user);
  return data;
};
const deleteUserById = async (id: string) => {
  const { data } = await api.delete<User>("admin/delete/" + id);
  return data;
};
const getUserList = async () => {
  const { data } = await api.get<User[]>("admin/user_list-up");
  return data;
};
const logoutUser = async (token: string, email: string) => {
  const { data } = await api.post<User>("admin/logout", { email, token });
  return data;
};

export { postNewUser, updateUserById, deleteUserById, getUserList, logoutUser };
