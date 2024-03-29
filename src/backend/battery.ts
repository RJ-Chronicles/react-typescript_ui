import { BatteryName } from "../store/type";
import api from "./api";

const postNewBattery = async (battery: BatteryName) => {
  const { data } = await api.post<BatteryName>("battery/add", battery);
  return data;
};
const updateBatteryById = async (battery: BatteryName, id: string) => {
  const { data } = await api.patch<BatteryName>(
    "battery/update/" + id,
    battery
  );
  return data;
};
const deleteBatteryById = async (id: string) => {
  const { data } = await api.delete<BatteryName>("battery/delete/" + id);
  return data;
};
const getBatteryList = async () => {
  const { data } = await api.get<BatteryName[]>("battery/user_list-up");
  return data;
};

const getBatterySizeById = async (id: string) => {
  const { data } = await api.get<BatteryName>("battery/seleted/" + id);
  return data;
};

export {
  postNewBattery,
  updateBatteryById,
  deleteBatteryById,
  getBatteryList,
  getBatterySizeById,
};
