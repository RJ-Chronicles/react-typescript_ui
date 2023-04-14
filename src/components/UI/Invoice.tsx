const Invoice = () => {
  return (
    <div className="mx-20  my-10 ">
      <div id="heading" className="">
        <h1 className="uppercase text-4xl font-bold font-serif text-center">
          Kallyankar Batteries Gargoti
        </h1>
      </div>
      {/* header section */}
      <div
        id="details"
        className="flex justify-between border-2 border-slate-900 mt-5 font-mono"
      >
        <div className=" w-1/2 border-r-2 border-slate-900">
          <p className="text-center font-bold border-b-2 border-slate-900 py-2">
            Customer Details
          </p>
          <div className="p-3">
            <div className="flex space-x-11 py-1">
              <div className="font-bold">Name</div>
              <p className="">Rajendra Balavant Jondhalekar</p>
            </div>
            <div className="flex space-x-5 py-1">
              <div className="font-bold">Contact</div>
              <p className="">9387462489</p>
            </div>
            <div className="flex space-x-5 py-1">
              <p className="font-bold">Address</p>
              <p className="">
                Kallyankar Batteries Gargoti Kallyankar Batteries Gargoti
              </p>
            </div>
          </div>
        </div>
        <div className=" w-1/2">
          <p className="text-center font-bold border-b-2 border-slate-900 py-2">
            Company Details
          </p>
          <div className="p-3">
            <div className="flex space-x-9 py-1">
              <div className="font-bold">Owner</div>
              <p className="">Rajendra Balavant Jondhalekar</p>
            </div>
            <div className="flex space-x-5 py-1">
              <div className="font-bold">Contact</div>
              <p className="">9387462489</p>
            </div>
            <div className="flex space-x-5 py-1">
              <p className="font-bold">Address</p>
              <p className="">
                Kallyankar Batteries Gargoti Kallyankar Batteries Gargoti
              </p>
            </div>
            <div className="flex space-x-12 py-1">
              <p className="font-bold w-30">Web</p>
              <p className="">kallyankar@kallyankar.com</p>
            </div>
          </div>
        </div>
      </div>
      {/* table section */}
      <div className="relative  shadow-md  border-x-2 border-b-2 border-slate-900 h-72">
        <h1 className="text-center  text-3xl border-b-2 border-slate-900 font-sans uppercase">
          Invoice
        </h1>
        <table className="w-full  text-left text-gray-900 dark:text-gray-400 table-auto ">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr No
              </th>
              <th scope="col" className="px-6 py-3">
                Name of Product
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Rate
              </th>
              <th scope="col" className="px-6 py-3">
                GST %
              </th>
              <th scope="col" className="px-6 py-3">
                GST Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3 ">Kallyankar battery prroduct</td>
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">50000</td>
              <td className="px-6 py-3">18</td>
              <td className="px-6 py-3">540</td>
              <td className="px-6 py-3">55000</td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-right " colSpan={2}>
                Total
              </td>
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">50000</td>
              <td className="px-6 py-3">18</td>
              <td className="px-6 py-3">540</td>
              <td className="px-6 py-3">55000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom section */}
      <div
        id="bank-details"
        className="flex justify-between border-x-2 border-b-2 border-slate-900 font-mono"
      >
        <div className=" w-1/2 border-r-2 border-slate-900">
          <p className="text-center  font-bold border-b-2 border-slate-900 py-2">
            Total in words
          </p>
          <p className="text-center font-base border-b-2 border-slate-900 py-4">
            eighty-four thousand three hundred three
          </p>
          <p className="text-center font-bold border-b-2 border-slate-900 py-4">
            Bank Details
          </p>
          <div className="p-3">
            <div className="flex space-x-10 py-1">
              <div className="font-bold">Bank Name</div>
              <p className="font-bold">State Bank of India</p>
            </div>
            <div className="flex space-x-5 py-1">
              <div className="font-bold">Branch Name</div>
              <p className="font-bold">Gargoti</p>
            </div>
            <div className="flex space-x-5 py-1">
              <p className="font-bold">Bank Acc No</p>
              <p className="font-bold">900049948823</p>
            </div>
            <div className="flex space-x-9 py-1">
              <p className="font-bold">Bank IFSC</p>
              <p className="font-bold">SBIN0000345</p>
            </div>
          </div>
        </div>
        <div className=" w-1/2">
          <div className="flex justify-between items-center p-2    border-b-2 border-slate-900">
            <p className="font-bold ">Taxable Amount</p>
            <p className="font-bold">90009</p>
          </div>
          <div className="flex justify-between items-center p-2    border-b-2 border-slate-900">
            <p className="font-bold ">Total TAX</p>
            <p className="font-bold">500</p>
          </div>
          <div className="flex justify-between items-center p-2    border-b-2 border-slate-900">
            <p className="font-bold ">Total Amount after TAX</p>
            <div className="font-extrabold flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>5000</span>
            </div>
          </div>
          <div className=" p-2 text-sm    border-b-2 border-slate-900">
            <p className="text-center ">
              Certified that the particulars given above are true and correct.
            </p>
            <p className="font-black text-xl text-center">
              For Kallyankar Batteries
            </p>
          </div>
          <div className=" p-2  skew-y-3">
            <p className="text-center ">This is computer generated invoice</p>
            <p className="text-center ">No signature required</p>
          </div>
          <div className=" p-2 w-full   border-t-2 border-slate-900">
            <p className="font-bold text-center text-sm ">
              Authorized Signature
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
