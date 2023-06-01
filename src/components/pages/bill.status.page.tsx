import { useEffect, useContext, useState } from "react";
import AuthContext from "../../context/appContext";
import cstmerService from "../../services/CustomerService";
import TablePagination from "@mui/material/TablePagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ReactComponent as Currency } from "../svg/CurrencySvg.svg";
import Heading from "../UI/Heading";
import TextField from "@mui/material/TextField";
import PayUnpaidAmount from "../UI/Forms/PayUnpaidAmount";

const BillingStatusPage = () => {
  const appContext = useContext(AuthContext);
  const [listByStatus, setListByStatus] = useState([]);
  const [billStatus, setBillStatus] = useState("Unpaid");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataToPassPayBill, setDataToPassPayBill] = useState({});
  const [showPayModal, setShowPayModal] = useState(false);
  const token = appContext.token;

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    const fetchUnpaidBillList = async () => {
      const response = await cstmerService.getCustomerListByBillingStatus(
        billStatus,
        headers
      );
      console.log(response.data);
      setListByStatus(response.data.list);
    };
    fetchUnpaidBillList();
  }, [token, billStatus]);

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
    const data = listByStatus.find((element: any) => element._id === recordId);
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
      <Heading>
        <h1 className="text-center text-2xl font-bold uppercase">
          A LIST OF {billStatus} RECORDS IS DISPLAYED. 
        </h1>
        <div className="flex justify-end">
          <PaymentStatus />
        </div>
      </Heading>

      <div className="relative  shadow-md sm:rounded-lg m-10">
        <table className="w-full text-sm text-left text-gray-700 tracking-wider">
          <thead className="text-xs md:text-sm text-gray-800 uppercase bg-gray-200 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Unpaid Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll w-full max-h-60">
            {(rowsPerPage > 0
              ? listByStatus.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : listByStatus
            ).map((row: any, index) => (
              <tr
                key={index}
                className="bg-white border-b text-sm text-slate-700 font-semibold hover:bg-gray-50"
              >
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.contact}</td>
                <td className="px-6 py-4"> {row.email} </td>
                <td className="px-6 py-4"> {row.address} </td>
                <td className="px-6 py-4 ">
                  <p className="text-red-500 tracking-widest flex">
                    <span>{row.unpaid_amount} </span>
                    <span>
                      <Currency />
                    </span>
                  </p>
                </td>
                <td className="px-6 py-4 text-green-600">
                  {" "}
                  <button
                    onClick={
                      row.unpaid_amount !== 0 ? updateUnpaidAmount : () => {}
                    }
                    name={row._id}
                  >
                    Pay
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
                  count={listByStatus.length}
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
      {dataToPassPayBill && (
        <PayUnpaidAmount
          open={showPayModal}
          closePaymentOption={closePaymentOption}
          dataToPassPayBill={dataToPassPayBill}
        />
      )}
    </div>
  );
};

export default BillingStatusPage;
