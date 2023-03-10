import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Card from "@mui/material/Card";
interface DummyPayload {
  name: string;
  product_code: string;
  ampere_sie: string;
  available_quantity: string;
}
const StockBoard = () => {
  const Dummy: DummyPayload[] = [
    {
      name: "AMARON",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "AMARON",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "AMARON",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "AMARON",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "EXIDE",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "EXIDE",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "EXIDE",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "EXIDE",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "EXIDE",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "AMARON",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
    {
      name: "AMARON",
      product_code: "SLKE024L3K",
      ampere_sie: "2AMP",
      available_quantity: "45",
    },
  ];

  const BatteryIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="blue"
        className="w-10 h-10 mx-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5h6.75V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
        />
      </svg>
    );
  };
  const RightCheck = () => {
    return (
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
    );
  };
  return (
    <div className="flex justify-center items-start flex-wrap bg-white">
      {Dummy.map((rec: DummyPayload, index: any) => {
        return (
          <div className="m-2 shadow-lg" key={index}>
            <Card variant="outlined">
              <div
                key={index}
                className="w-36 h-36 hover:scale-105 duration-300  text-left "
              >
                <div className=" h-8 w-full bg-slate-200">
                  {/* <BatteryIcon /> */}
                  {/* <span className="shadow-lg rounded-full w-6 h-6 text-center bg-blue-900 text-white">
                    {rec.ampere_sie}
                  </span> */}
                  <hr />
                </div>
                <div className="p-2 group hover:bg-gradient-to-r from-cyan-500 to-blue-500">
                  <h1 className="text-base font-semibold text-slate-600 font-serif group-hover:text-white">
                    {rec.name}
                  </h1>
                  <h2 className="text-sm group-hover:text-white text-slate-500 font-sans">
                    {rec.product_code}
                  </h2>
                  <div className="flex justify-between items-center my-1 space-x-4">
                    <p className="flex flex-row space-x-1 group-hover:text-white">
                      <span>{rec.ampere_sie}</span>
                      <span>
                        <RightCheck />
                      </span>
                    </p>
                    <p className="flex flex-row space-x-1 group-hover:text-white">
                      <span>{rec.available_quantity}</span>
                      <span>
                        <RightCheck />
                      </span>
                    </p>
                  </div>
                  <button className="text-sm">Add</button>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default StockBoard;
