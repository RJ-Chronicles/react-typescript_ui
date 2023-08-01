import { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/appContext";

import TablePagination from "@mui/material/TablePagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ReactComponent as Currency } from "../svg/CurrencySvg.svg";
import PayUnpaidAmount from "../UI/Forms/PayUnpaidAmount";
import Spinner from "../UI/Spinner";
import billingService from "../../services/BillingService";
import Header from "../UI/Header";
const BillingStatusPage = () => {
  const appContext = useContext(AuthContext);
  const refreshEffect = appContext.refreshEffect;
  console.log("refreshEffect : " + refreshEffect);
  const [billStatus, setBillStatus] = useState("Unpaid");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataToPassPayBill, setDataToPassPayBill] = useState({});
  const [showPayModal, setShowPayModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const token = appContext.token;
  const [billingList, setBillingList] = useState<any[]>([]);
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    const fetchUnpaidBillList = async () => {
      try {
        setIsLoading(true);
        const resp = await billingService.getBillingListByStatus(
          billStatus,
          headers
        );
        console.log(resp.data.billingList);
        setBillingList(resp.data.billingList);
        // const response = await cstmerService.getCustomerListByBillingStatus(
        //   billStatus,
        //   headers
        // );
        // console.log(response.data);
        // setListByStatus(response.data.list);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log("Error " + err);
      }
    };
    fetchUnpaidBillList();
  }, [token, billStatus, refreshEffect]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const PaymentStatus = () => (
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
      value={billStatus}
      onChange={(event) => setBillStatus(event.target.value)}
    >
      <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
      <FormControlLabel value="Unpaid" control={<Radio />} label="Unpaid" />
    </RadioGroup>
  );

  const updateUnpaidAmount = (event: any) => {
    const recordId = event.target.name;
    console.log("recordId : ", recordId);
    const data = billingList.find((element: any) => element._id === recordId);
    console.log(data);
    if (data) {
      setDataToPassPayBill(data);
    }
    setShowPayModal(true);
  };

  const closePaymentOption = () => {
    setShowPayModal(false);
  };

  return (
    <div className="md:min-h-screen  w-full">
      <Header>
        <h1 className="text-xl font-semibold font-sans">
          {billStatus} records{" "}
        </h1>
      </Header>

      <div className="mx-10">
        <PaymentStatus />
        {<Spinner open={isLoading} />}
        <div className="relative  shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-700 tracking-wider">
            <thead className="text-xs md:text-sm text-gray-800 uppercase bg-gray-200 ">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Name
                </th>
                <th scope="col" className="px-2 py-3">
                  Contact
                </th>
                <th scope="col" className="px-2 py-3">
                  Email
                </th>
                <th scope="col" className="px-2 py-3">
                  Address
                </th>
                <th scope="col" className="px-2 py-3">
                  GST Amount
                </th>
                <th scope="col" className="px-2 py-3">
                  Total Amount
                </th>
                <th scope="col" className="px-2 py-3">
                  Unpaid Amount
                </th>
                <th scope="col" className="px-2 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll w-full max-h-60">
              {(rowsPerPage > 0
                ? billingList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : billingList
              ).map((row: any, index) => (
                <tr
                  key={index}
                  className="bg-white border-b text-sm text-slate-700 font-normal hover:bg-gray-50"
                >
                  <td className="px-2 py-4">{row.customer.name}</td>
                  <td className="px-2 py-4">{row.customer.contact}</td>
                  <td className="px-2 py-4"> {row.customer.email} </td>
                  <td className="px-2 py-4"> {row.customer.address} </td>
                  <td className="px-2 py-4"> {row.gst_amount} </td>
                  <td className="px-2 py-4"> {row.total_amount} </td>
                  <td className="px-2 py-4 ">
                    <p className="text-red-500 tracking-widest flex">
                      <span>{row.unpaid_amount} </span>
                      <span>
                        <Currency />
                      </span>
                    </p>
                  </td>
                  <td className="px-2 py-4 text-green-600">
                    {" "}
                    <button
                      onClick={
                        row.unpaid_amount !== 0 ? updateUnpaidAmount : () => {}
                      }
                      name={row._id}
                    >
                      {row.unpaid_amount !== 0 ? "Pay" : "Paid"}
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="w-full mx-auto">
                <td colSpan={6} className="mx-auto  w-full">
                  <TablePagination
                    className="w-full"
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={billingList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        {showPayModal && (
          <PayUnpaidAmount
            open={showPayModal}
            closePaymentOption={closePaymentOption}
            dataToPassPayBill={dataToPassPayBill}
          />
        )}
      </div>
    </div>
  );
};

export default BillingStatusPage;
