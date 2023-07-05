import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import AppContext from "../../../context/appContext";
import Button from "@mui/material/Button";
import cstmerService from "../../../services/CustomerService";
import ProductService from "../../../services/ProductService";

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

interface CIProps {
  open: boolean;
  closeCartHandler: () => void;
  customerId: string;
}

interface CDProps {
  name: string;
  address: string;
  contact: number;
  email: string;
  last_name: string;
}
const CartItems = (props: CIProps) => {
  const { open, customerId } = props;
  const appContext = React.useContext(AppContext);
  const token = appContext.token;
  const [customer, setCustomer] = React.useState<CDProps>();
  const [billStatus, setBillStatus] = React.useState("Paid");
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [inputFieldAmount, setInputAmount] = React.useState("");
  const [totalGSTAmount, setTotalGSTAmount] = React.useState(0);

  React.useEffect(() => {
    const fetchCustomerDetails = async () => {
      const headers = {
        headers: {
          Authorization: token,
        },
      };
      try {
        const response = await cstmerService.getCustomerById(
          customerId,
          headers
        );
        const data = {
          name: response.data.customer.name,
          address: response.data.customer.address,
          contact: response.data.customer.contact,
          email: response.data.customer.email,
          last_name: response.data.customer.last_name,
        };
        setCustomer(data);
      } catch (err) {
        console.log("Error while fetching data");
      }
    };
    fetchCustomerDetails();
  }, [customerId, token, open]);

  const handleCartRemoveItem = (event: any) => {
    const serial_number = event.target.name;
    const data = appContext.cartItems.filter(
      (item: any) => item.serial_number !== serial_number
    );
    appContext.storeCartItems((prev: any) => [...data]);
    if (data.length > 0) {
      calCulateTotalAmountAndInitialBillingStatus();
    } else {
      props.closeCartHandler();
    }
  };

  React.useEffect(() => {
    calCulateTotalAmountAndInitialBillingStatus();
  });

  const calCulateTotalAmountAndInitialBillingStatus = () => {
    let price = 0;
    let gstAmount = 0;

    appContext.cartItems.forEach((item: any) => {
      gstAmount = (parseInt(item.price) * parseInt(item.GST)) / 100;
      price = price + parseInt(item.price);
    });

    price += gstAmount;
    setTotalAmount(price);
    setTotalGSTAmount(gstAmount);
    console.log(price);
  };

  const handleCartItemClose = () => {
    props.closeCartHandler();
  };

  const netAmount = (price: string, gst: string) => {
    return parseInt(price) + (parseInt(price) * parseInt(gst)) / 100;
  };

  const ItemList = () => (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Name
          </th>

          <th scope="col" className="px-6 py-3">
            Serial Number
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            GST
          </th>
          <th scope="col" className="px-6 py-3">
            Net Amount
          </th>

          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {appContext.cartItems.length > 0 &&
          appContext.cartItems.map((item: any, index: any) => (
            <tr
              key={index}
              className="bg-white border-b text-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-2">{item.name}</td>
              <td className="px-6 py-2">{item.serial_number}</td>
              <td className="px-6 py-2">{item.price}</td>
              <td className="px-6 py-2">{item.GST + "%"}</td>
              <td className="px-6 py-2">{netAmount(item.price, item.GST)}</td>

              <td className="px-6 py-4">
                <button
                  name={item.serial_number}
                  onClick={handleCartRemoveItem}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  const handleAmountValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputAmount = e.target.value;
    if (parseInt(inputAmount) > totalAmount) {
      setInputAmount((prev) => prev);
    } else {
      setInputAmount((prev) => inputAmount);
    }
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
  const handlePrintInvoice = async () => {
    try {
      const headers = {
        headers: {
          Authorization: appContext.token,
        },
      };
      const amount =
        inputFieldAmount !== "" ? totalAmount - parseInt(inputFieldAmount) : 0;
      appContext.cartItems.forEach(async (product: any) => {
        const resp = await ProductService.submitProductDetails(
          {
            name: product.name,
            type: product.type,
            price: product.price,
            customer: product.customer,
            vehicle_name: product.vehicle_name,
            vehicle_number: product.vehicle_number,
            serial_number: product.serial_number,
          },
          // { ...product },
          headers
        );
        console.log(product);
        console.log(resp.data);
        // await billingService.submitBillingRecord({total_amount:
        //   billing_status:
        //   unpaid_amount:
        //   gst:
        //   gst_amount:
        //   customer:}, headers);
      });
      console.log({
        gst_amount: totalGSTAmount,
        total_amount: totalAmount,
        unpaid_amount: amount,
        bill_status: billStatus,
        customer: appContext.cartItems[0].customer,
      });
      await billingService.submitBillingRecord(
        {
          gst_amount: totalGSTAmount,
          total_amount: totalAmount,
          unpaid_amount: amount,
          bill_status: billStatus,
          customer: appContext.cartItems[0].customer,
        },
        headers
      );
      appContext.storeCartItems((prev: any) => []);
      appContext.refreshData();
      props.closeCartHandler();
    } catch (err) {
      console.log("eeror while saving record");
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleCartItemClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 className="uppercase text-center font-bold mb-4 text-xl">
          purchase order items
        </h2>

        <div className="shadow-lg rounded-lg px-7 py-2 border border-slate-400">
          <h2 className="text-center uppercase text-lg font-semibold mb-2 border-b">
            Customer Details
          </h2>
          <div className="text-left flex justify-around">
            <p>
              <span>Name{"   :"} </span>
              <span className="font-bold text-sm text-blue-900 uppercase">
                {customer?.name} {customer?.last_name}
              </span>
            </p>
            <p>
              <span>Contact{"   :"} </span>
              <span className="font-bold text-sm text-blue-900 uppercase">
                {customer?.contact}
              </span>
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <ItemList />
        </div>
        <div className="text-left flex justify-between mt-6">
          <div className="bg-slate-700 text-white py-4 px-6  font-bold rounded-sm">
            <span>Total Amount</span>
            {": "}
            <span className="border-b-4 border-red-400 px-1">
              {totalAmount}
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
                  inputFieldAmount.length > 0 ? inputFieldAmount : totalAmount
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
            Print Invoice
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

export default React.memo(CartItems);
