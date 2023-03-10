import { useState, useContext } from "react";
import validator from "validator";

import AuthContext from "../../context/appContext";
import { CUSTOMER_OPERATIONS } from "../static/operations";
import FormError from "./FormError";
import CustomerService from "../../services/CustomerService";
import { ErrorHandler } from "../helper/helperFunctions";

type registeredType = undefined | string;

const CustomerForm = () => {
  const appContext = useContext(AuthContext);

  const { mode, initial_data } = appContext.formProps;

  const { last_name, email, address, name, contact, _id } = initial_data;

  const [alreadyRegistered, setAlreadyRegistred] = useState<registeredType>();

  const [customer, updateCustomer] = useState({
    name: name,
    last_name: last_name,
    email: email,
    contact: contact,
    address: address,
  });
  const [fieldValidator, setFieldValidator] = useState({
    emailError: false,
    contactError: false,
  });
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fieldValidator.contactError || fieldValidator.emailError) {
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: appContext.token,
    };
    try {
      if (mode === CUSTOMER_OPERATIONS.ADD_CUSTOMER) {
        await CustomerService.submitCustomerDetails(
          { ...customer },
          { headers }
        );
      }
      if (mode === CUSTOMER_OPERATIONS.UPDATE_CUSTOMER) {
        await CustomerService.updateCustomerById({ ...customer }, _id, {
          headers,
        });
      }
      appContext.refreshData();
      appContext.setModalVisible(false);
    } catch (e) {
      console.log(e);
      const data = ErrorHandler(e, "CUSTOMER_ADD");
      setAlreadyRegistred(data);
    }
  };

  const emailBlurHandler = () => {
    setFieldValidator((prev) => ({
      ...prev,
      emailError: !validator.isEmail(customer.email),
    }));
  };
  const contactBlurHandler = () => {
    setFieldValidator((prev) => ({
      ...prev,
      contactError: !validator.isMobilePhone(customer.contact, ["en-IN"]),
    }));
  };

  const resetValidatorHandler = () => {
    setFieldValidator({
      emailError: false,
      contactError: false,
    });
  };

  return (
    <div>
      {alreadyRegistered && (
        <FormError
          title={alreadyRegistered}
          classes={"text-base font-medium text-center bg-red-100 py-2 rounded"}
        />
      )}

      <div className="w-full  bg-white p-5 rounded-lg lg:rounded-l-none">
        <form
          className="px-8 pt-6 pb-4 bg-white rounded"
          onSubmit={handleFormSubmit}
        >
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                onChange={(e) =>
                  updateCustomer((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                value={customer.name}
              />
            </div>
            <div className="md:ml-2">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                onChange={(e) =>
                  updateCustomer((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
                value={customer.last_name}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Address"
              onChange={(e) =>
                updateCustomer((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              value={customer.address}
            />
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) =>
                updateCustomer((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              onBlur={emailBlurHandler}
              onFocus={resetValidatorHandler}
              value={customer.email}
            />
            {fieldValidator.emailError && (
              <FormError title={"Please provide valid Email Id!"} />
            )}
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="contact"
              type="number"
              placeholder="Contact"
              onChange={(e) =>
                updateCustomer((prev) => ({
                  ...prev,
                  contact: e.target.value,
                }))
              }
              onBlur={contactBlurHandler}
              onFocus={resetValidatorHandler}
              value={customer.contact}
            />
            {fieldValidator.contactError && (
              <FormError title={"Please provide valid contact number!"} />
            )}
          </div>

          <div className="mb-6 text-center">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
          <hr className="mb-6 border-t" />
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
