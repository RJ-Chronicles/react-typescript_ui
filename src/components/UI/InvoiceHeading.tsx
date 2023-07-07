import { ReactComponent as Logo } from "../svg/logo.svg";
const InvoiceHeading = (props: any) => {
  return (
    <>
      <div className="flex flex-col p-4  bg-white  rounded-xl dark:bg-gray-800">
        <div className="flex justify-between">
          <div>
            <Logo />
          </div>
          <div className="text-right">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Invoice #
            </h2>

            <address className="mt-4 not-italic text-gray-800 dark:text-gray-200">
              Shinde complex, main-road Gargoti
              <br />
              Bhudargad, Kolhapur, PIN: 416209
              <br />
            </address>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Bill to:
            </h3>
            <p className="text-base font-medium text-gray-800 dark:text-gray-200">
              {props.customer.name + " " + props.customer.last_name}
            </p>
            <address className=" not-italic text-gray-500">
              {props.customer.address}
              <br />
              {props.customer.contact}
            </address>
          </div>

          <div className="sm:text-right space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                  Invoice date:
                </dt>
                <dd className="col-span-2 text-gray-500">
                  {new Date().toLocaleDateString()}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceHeading;
