import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthContext from "../../../context/appContext";
import cstmerService from "../../../services/CustomerService";
import billingService from "../../../services/BillingService";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PayUnpaidAmount = (props: any) => {
  console.log(props);
  const [billStatus, setBillStatus] = React.useState("Paid");
  const [inputFieldAmount, setInputAmount] = React.useState("");
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

    if (parseInt(inputAmount) > props.dataToPassPayBill.unpaid_amount) {
      setInputAmount((prev) => prev);
    } else {
      setInputAmount((prev) => inputAmount);
    }
  };

  const handlePrintInvoice = async () => {
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

      const response = await billingService.updateBillingById(
        { bill_status: billStatus, unpaid_amount: amount },
        props.dataToPassPayBill._id,
        headers
      );
      console.log(response.data);
      // await cstmerService.updateCustomerBillingStatusById(
      //   {
      //     bill_status: billStatus,
      //     //unpaid_amount: inputFieldAmount === "" ? "0" : inputFieldAmount,
      //     unpaid_amount: amount,
      //   },
      //   props.dataToPassPayBill._id,
      //   headers
      // );

      appContext.refreshData();
      props.closePaymentOption();
    } catch (err) {
      console.log("eeror while saving record");
    }
  };

  React.useEffect(() => {
    setInputAmount("");
  }, [open]);
  return (
    <Modal
      open={open}
      onClose={handleCartItemClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 className="uppercase text-center font-bold mb-4 text-xl">
          Your pending Amount
        </h2>
        <div className="text-left flex justify-between mt-6">
          <div className="bg-slate-700 text-white py-4 px-6  font-bold rounded-sm">
            <span>Total Amount</span>
            {": "}
            <span className="border-b-4 border-red-400 px-1">
              {props.dataToPassPayBill.unpaid_amount}
            </span>
          </div>
          <div className="flex justify-between">
            <PaymentStatus />
            {billStatus === "Unpaid" && (
              <TextField
                label="Amount In INR"
                id="outlined-size-small"
                size="small"
                onChange={handleAmountValueChange}
                type="number"
                value={
                  inputFieldAmount.length > 0
                    ? inputFieldAmount
                    : props.dataToPassPayBill.unpaid_amount
                }
              />
            )}
          </div>
        </div>
        <div className="flex w-full justify-center align-items-center mt-10 mb-3">
          <Button
            className="w-full"
            variant="contained"
            color="success"
            onClick={handlePrintInvoice}
          >
            Pay Amount
          </Button>
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
