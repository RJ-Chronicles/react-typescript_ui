import { useContext, useEffect, useState } from "react";
import { Headers, StockElementsPayload } from "../../AppModel";
import AuthContext from "../../context/appContext";
import stockService from "../../services/StockService";

const StockBoard = () => {
  const appContext = useContext(AuthContext);
  const token = appContext.token;
  const [stockList, setStockList] = useState<StockElementsPayload>();

  useEffect(() => {
    const headers: Headers = {
      headers: {
        Authorization: token,
      },
    };
    const stockData = async () => {
      const response = await stockService.fetchStockElements(headers);
      setStockList(response.data);
      console.log(response.data);
    };
    stockData();
  }, [token]);

  return (
    <div className="flex justify-left items-start flex-wrap bg-white">
      {stockList?.list?.map((rec, index: any) => {
        let animation =
          rec.quantity < 30
            ? "animate-pulse duration-300 bg-red-500 rounded-full"
            : "bg-green-500 rounded-sm";
        return (
          <div
            key={index}
            className="flex mx-2 flex-col my-2 space-y-6 md:space-y-0 md:space-x-6 md:flex-row"
          >
            <div className="bg-slate-700 rounded-xl text-white">
              <div className="p-2 mx-2 mt-2 rounded-t-xl bg-slate-800">
                <div className="text-center uppercase text-sm">
                  {rec.battery_name}
                </div>
                <h2 className="font-serif text-base text-center">
                  {rec.product_code}
                </h2>
                <h3 className="mt-2 text-center text-sm">{rec.amphere_size}</h3>
                <div className="flex justify-center">
                  <button className="inline-block px-4 py-2 my-2 text-center border border-violet-600 rounded-lg duration-200 hover:bg-violet-800 hover:border-violet-800">
                    Add to Stock
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-700"></div>

              <div className="p-4 mx-2 mb-2 rounded-b-xl bg-slate-800">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={"w-6 h-6 " + animation}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>

                    <span className="text-sm ml-1">
                      {rec.quantity} items in stock
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StockBoard;

/* <Card variant="outlined">
              <div
                key={index}
                className="w-36 h-36 hover:scale-105 duration-300  text-left "
              >
                <div className=" h-8 w-full bg-slate-200">

                  <hr />
                </div>
                <div className="p-2 group hover:bg-gradient-to-r from-cyan-500 to-blue-500">
                  <h1 className="text-base font-semibold text-slate-600 font-serif group-hover:text-white">
                    {rec.battery_name}
                  </h1>
                  <h2 className="text-sm group-hover:text-white text-slate-500 font-sans">
                    {rec.product_code}
                  </h2>
                  <div className="flex justify-between items-center my-1 space-x-4">
                    <p className="flex flex-row space-x-1 group-hover:text-white">
                      <span>{rec.amphere_size}</span>
                      <span>
                        <RightCheck />
                      </span>
                    </p>
                    <p className="flex flex-row space-x-1 group-hover:text-white">
                      <span>{rec.quantity}</span>
                      <span>
                        <RightCheck />
                      </span>
                    </p>
                  </div>
                  <button className="text-sm">Add</button>
                </div>
              </div>
</Card> */
