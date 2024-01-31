import React, { Fragment } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import AppContext from "../../../context/appContext";
import Button from "@mui/material/Button";
import cstmerService from "../../../services/CustomerService";
import ProductService from "../../../services/ProductService";
import { Dialog, Transition } from "@headlessui/react";
import billingService from "../../../services/BillingService";
import { ReactComponent as Delete } from "../../svg/delete.svg";

import InvoiceHeading from "../InvoiceHeading";
import { saveToPDF } from "../../helper/helperFunctions";
import Spinner from "../Spinner";

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
  const [totalAmountExcludeGST, setTotalAmountExcludeGST] = React.useState(0);
  const [inputFieldAmount, setInputAmount] = React.useState("");
  const [totalGSTAmount, setTotalGSTAmount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hideDeleteColumn, setHideDelteColumn] = React.useState(false);
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
          customer_gst: response.data.customer.gst_number,
        };
        setCustomer(data);
      } catch (err) {
        console.log("Error while fetching data");
      }
    };
    fetchCustomerDetails();
  }, [customerId, token, open]);

  const handleCartRemoveItem = (event: any) => {
    console.log("delete Clicked");
    const serial_number = event.target.name;
    console.log(serial_number);
    const data = appContext.cartItems.filter(
      (item: any) => item.serial_number !== serial_number
    );
    console.log(data);
    appContext.storeCartItems((prev: any) => [...data]);
    if (data.length > 0) {
      calCulateTotalAmount();
    } else {
      props.closeCartHandler();
    }
  };

  React.useEffect(() => {
    calCulateTotalAmount();
  });

  const initialUnpaidAmount = (
    totalAmountExcludeGST +
    totalGSTAmount -
    1
  ).toString();
  React.useEffect(() => {
    setInputAmount(initialUnpaidAmount);
  }, [initialUnpaidAmount]);

  const calCulateTotalAmount = () => {
    let price = 0;
    let gstAmount = 0;

    appContext.cartItems.forEach((item: any) => {
      const { itemGST, itemPrice } = calculateNetAmountAndGST(
        item.price,
        item.GST
      );
      console.log(itemGST + "    " + itemPrice);

      price += itemPrice;
      gstAmount += itemGST;
    });
    setTotalAmountExcludeGST(price);
    setTotalGSTAmount(gstAmount);
  };

  const handleCartItemClose = () => {
    props.closeCartHandler();
  };

  const calculateNetAmountAndGST = (price: string, GST: string) => {
    const itemGST =
      Math.round(
        ((parseInt(price) / (1 + (parseInt(GST) * 2) / 100)) * parseInt(GST)) /
          100
      ) * 2;
    const itemPrice = parseInt(price) - itemGST;
    return { itemGST, itemPrice };
  };

  const netAmount = (price: string, gst: string) => {
    const { itemPrice } = calculateNetAmountAndGST(price, gst);
    return itemPrice;
  };

  const ItemList = () => (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
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
          {!hideDeleteColumn && (
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          )}
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
              <td className="px-6 py-2">{netAmount(item.price, item.GST)}</td>
              <td className="px-6 py-2">{item.GST + "%"}</td>
              <td className="px-6 py-2">{item.price}</td>
              {!hideDeleteColumn && (
                <td className="px-6 py-4">
                  <button
                    name={item.serial_number}
                    onClick={handleCartRemoveItem}
                  >
                    <Delete />
                  </button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );

  const handleAmountValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputAmount = e.target.value;
    if (inputAmount === "") {
      setInputAmount(inputAmount);
    } else if (
      parseInt(inputAmount) >
      totalAmountExcludeGST + totalGSTAmount - 1
    ) {
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
  const SaveAsPDFHandler = async () => {
    setHideDelteColumn(true);
    setIsLoading(true);
    try {
      const headers = {
        headers: {
          Authorization: appContext.token,
        },
      };
      let amount =
        inputFieldAmount !== ""
          ? totalAmountExcludeGST + totalGSTAmount - parseInt(inputFieldAmount)
          : 0;
      amount = billStatus === "Paid" ? 0 : amount;
      console.log("Amount : " + amount);
      appContext.cartItems.forEach(async (product: any) => {
        await ProductService.submitProductDetails(
          {
            name: product.name,
            type: product.type,
            price: product.price,
            customer: product.customer,
            vehicle_name: product.vehicle_name,
            vehicle_number: product.vehicle_number,
            serial_number: product.serial_number,
          },
          headers
        );
      });

      await billingService.submitBillingRecord(
        {
          gst_amount: totalGSTAmount,
          total_amount: totalAmountExcludeGST + totalGSTAmount,
          unpaid_amount: amount,
          bill_status: billStatus,
          customer: appContext.cartItems[0].customer,
        },
        headers
      );
      setIsLoading(false);
      appContext.storeCartItems((prev: any) => []);
      appContext.refreshData();
      props.closeCartHandler();
      console.log(customer);
      const resp = saveToPDF(customer?.name, customer?.contact.toString());
      console.log(resp);
    } catch (err) {
      setIsLoading(false);
      console.log("eeror while saving record");
    }
  };

  return (
    <>
      {isLoading && <Spinner open={isLoading} />}
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleCartItemClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                <div className="p-4" id="print">
                  <InvoiceHeading customer={customer ? customer : {}} />
                  <div className="flex w-full justify-center items-center">
                    <ItemList />
                  </div>

                  <div className="mt-5 sm:mt-10">
                    <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-200">
                      Summary
                    </h4>

                    <ul className="mt-3 flex flex-col">
                      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                        <div className="flex items-center justify-between w-full">
                          <span>Subtotal</span>
                          <span> {totalAmountExcludeGST}</span>
                        </div>
                      </li>
                      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                        <div className="flex items-center justify-between w-full">
                          <span>CGST</span>
                          <span>{totalGSTAmount / 2}</span>
                        </div>
                      </li>
                      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200">
                        <div className="flex items-center justify-between w-full">
                          <span>SGST</span>
                          <span>{totalGSTAmount / 2}</span>
                        </div>
                      </li>
                      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-800 dark:border-gray-700 dark:text-gray-200">
                        <div className="flex items-center justify-between w-full">
                          <span>Amount to paid</span>
                          <span>{totalAmountExcludeGST + totalGSTAmount}</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-10">
                    <div className=" text-sm  w-full   flex justify-end pb-16">
                      <p className="font-medium text-sm px-8">
                        For Kalyankar Batteries
                      </p>
                    </div>

                    <div className=" p-2 w-full flex  justify-end ">
                      <p className="font-bold  text-sm border-t-2 border-slate-700 px-8 pt-2">
                        Authorized Signature
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-left flex justify-between mt-6">
                  <div className="flex justify-between">
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
                <div className="mt-4 flex space-x-2 px-4 pb-6">
                  <button
                    className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                    onClick={SaveAsPDFHandler}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Save &amp; Download</span>
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default React.memo(CartItems);
