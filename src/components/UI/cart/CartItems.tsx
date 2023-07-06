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
// import { Dialog, Transition } from '@headlessui/react';
import { ReactComponent as Delete } from "../../svg/delete.svg";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

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
    console.log("delete Clicked");
    const serial_number = event.target.name;
    console.log(serial_number);
    const data = appContext.cartItems.filter(
      (item: any) => item.serial_number !== serial_number
    );
    console.log(data);
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
                  <Delete />
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

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById("print")!;
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = "annoymous";
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [5.5, 8.5],
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement("canvas")!;
          const pageCtx = pageCanvas.getContext("2d")!;
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`invoice-${"forst"}.pdf`);
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  const addNextInvoiceHandler = () => {};

  return (
    <>
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
                  <h1 className="text-center text-lg font-bold text-gray-900">
                    INVOICE
                  </h1>
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
                  <div className="mt-4 flex flex-col items-end space-y-2">
                    <div className="flex w-full justify-between border-t border-black/10 pt-2">
                      <span className="font-bold text-sm">Subtotal:</span>
                      <span>{2000}</span>
                    </div>

                    <div className="flex w-full justify-between">
                      <span className="font-bold text-sm">GST</span>
                      <span>{totalGSTAmount}</span>
                    </div>
                    <div className="flex w-full justify-between border-t border-black/10 py-2">
                      <span className="font-bold text-sm">Total:</span>
                      <span className="font-bold text-sm">{totalAmount}</span>
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
                        value={
                          inputFieldAmount.length > 0
                            ? inputFieldAmount
                            : totalAmount
                        }
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
                    <span>Download</span>
                  </button>
                  <button
                    onClick={addNextInvoiceHandler}
                    className="flex w-full items-center justify-center space-x-1 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
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
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                    <span>Next</span>
                  </button>
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default React.memo(CartItems);
