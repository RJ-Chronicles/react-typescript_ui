import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthContext from "../../../context/appContext";
import { saveToPDF } from "../../helper/helperFunctions";
import billingService from "../../../services/BillingService";
import InvoiceHeading from "../InvoiceHeading";
import Spinner from "../Spinner";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PayUnpaidAmount = (props: any) => {
  const [billStatus, setBillStatus] = React.useState("Paid");
  const [inputFieldAmount, setInputAmount] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { open } = props;
  const appContext = React.useContext(AuthContext);

  const handleCartItemClose = () => {
    props.closePaymentOption();
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

  const handleAmountValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputAmount = e.target.value;
    if (inputAmount === "") {
      setInputAmount((prev) => "");
    } else if (parseInt(inputAmount) > props.dataToPassPayBill.unpaid_amount) {
      setInputAmount((prev) => prev);
    } else {
      setInputAmount((prev) => inputAmount);
    }
  };

  const handlePrintInvoice = async () => {
    setIsLoading(true);
    try {
      const headers = {
        headers: {
          Authorization: appContext.token,
        },
      };
      const amount =
        inputFieldAmount === ""
          ? "0"
          : parseInt(props.dataToPassPayBill.unpaid_amount) -
            parseInt(inputFieldAmount);

      await billingService.updateBillingById(
        { bill_status: billStatus, unpaid_amount: amount },
        props.dataToPassPayBill._id,
        headers
      );

      appContext.refreshData();
      props.closePaymentOption();
    } catch (err) {
      console.log("eeror while saving record");
    }

    const resp = saveToPDF(
      props.dataToPassPayBill.customer.name,
      props.dataToPassPayBill.customer.contact
    );
    console.log(resp);
    setIsLoading(false);
  };
  const initialUnpaidAmount = props.dataToPassPayBill.unpaid_amount;
  React.useEffect(() => {
    setInputAmount(initialUnpaidAmount);
  }, [open, initialUnpaidAmount]);
  return (
    <Modal
      open={open}
      onClose={handleCartItemClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isLoading && <Spinner open={isLoading} />}
        <div id="print">
          <InvoiceHeading customer={props.dataToPassPayBill.customer} />
          <div className="text-left w-full mt-6">
            <div className=" text-slate-700 flex justify-end w-full py-1 px-6  font-base rounded-sm">
              <div className="flex w-1/3 justify-start">
                <span className="pr-12">Total Amount</span>
                <span className=" ">
                  {props.dataToPassPayBill.unpaid_amount}
                </span>
              </div>
            </div>
            <div className="flex justify-end w-full py-1 px-6 text-slate-700 font-base border-b border-slate-400">
              <div className="flex w-1/3 justify-start">
                <span className="pr-12">Paid Amount</span>
                <span>{inputFieldAmount === "" ? "0" : inputFieldAmount}</span>
              </div>
            </div>
            <div className="flex justify-end  w-full py-1 px-6 text-slate-700 font-semibold">
              <div className="flex w-1/3 justify-start">
                <span className="pr-3">Pending Amount</span>
                <span>
                  {inputFieldAmount === ""
                    ? "0"
                    : parseInt(props.dataToPassPayBill.unpaid_amount) -
                      parseInt(inputFieldAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-left flex justify-left mt-6">
          <div className="flex justify-between items-center">
            <PaymentStatus />
            {billStatus === "Unpaid" && (
              <TextField
                label="Amount In INR"
                id="outlined-size-small"
                size="small"
                onChange={handleAmountValueChange}
                type="number"
                value={inputFieldAmount}
              />
            )}
          </div>
        </div>

        <div className="flex w-full justify-center align-items-center mt-10 mb-3">
          <button
            onClick={handlePrintInvoice}
            type="submit"
            className="w-full text-center space-x-2 bg-[#600080] hover:bg-[#8031a7] text-sm text-white font-medium py-2 px-10 border-b-4 border-[#8031a7] rounded-full my-10"
          >
            Submit
          </button>
        </div>
        <div className="flex justify-end items-center">
          <Button
            variant="outlined"
            color="error"
            onClick={handleCartItemClose}
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default PayUnpaidAmount;
