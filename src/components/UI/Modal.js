import { useContext } from "react";
import AuthContext from "../../context/appContext";
import {
  CUSTOMER_OPERATIONS,
  PRODUCT_OPERATIONS,
  USER_OPERATIONS,
} from "../static/operations";
import CustomerForm from "./CustomerForm";
import UserForm from "./UserForm";
import ProductForm from "./ProductForm";
const TestModal = () => {
  const appContext = useContext(AuthContext);
  const { mode, title } = appContext.formProps;

  return (
    <div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative max-w-3xl p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3">
              <div className=" text-center sm:ml-4 sm:text-left">
                <div className="flex items-start justify-between  border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl italic font-semibold">{title}</h3>
                  <button
                    onClick={() => appContext.setModalVisible(false)}
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/*body*/}
                {/*--------------------Customer Add Update Operations*/}
                {mode === CUSTOMER_OPERATIONS.ADD_CUSTOMER && (
                  <CustomerForm mode={mode} />
                )}
                {mode === CUSTOMER_OPERATIONS.UPDATE_CUSTOMER && (
                  <CustomerForm />
                )}

                {/*--------------------User Add Update Operations*/}
                {mode === USER_OPERATIONS.ADD_USER && <UserForm />}

                {mode === USER_OPERATIONS.UPDATE_USER && <UserForm />}

                {/*--------------------User Add Update Operations*/}
                {mode === PRODUCT_OPERATIONS.ADD_PRODUCT && <ProductForm />}

                {mode === PRODUCT_OPERATIONS.UPDATE_PRODUCT && <ProductForm />}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    onClick={() => appContext.setModalVisible(false)}
                    className="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-red-600 inline-block w-32"
                  >
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-red-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">
                      Close
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestModal;
