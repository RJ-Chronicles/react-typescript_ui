import Amphere from "../UI/Amphere";
import BatteryNames from "../UI/BatteryNames";

interface List {
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const Battery = () => {
  return (
    <div className="w-full mt-10">
      <div className="flex flex-col justify-center items-center md:flex-row space-x-10 md:space-x-0">
        <BatteryNames />
        <Amphere />
      </div>
    </div>
  );
};

export default Battery;
