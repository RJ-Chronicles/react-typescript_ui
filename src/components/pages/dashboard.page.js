import Dummy from "../../Dummy";

export default function Dashboard() {
  //const [listNotification, setListOfNotification] = useState([]);

  return (
    <div className="container mx-auto mt-12">
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3">
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total users
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">12,00</div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Profit
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            $ 450k
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Orders
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">20k</div>
        </div>
      </div>
      <div>
        <div className="shadow-lg rounded-lg overflow-hidden">
          <div className="py-3 px-5 bg-gray-50 flex justify-between items-center">
            <Dummy />
          </div>
        </div>
      </div>
    </div>
  );
}
