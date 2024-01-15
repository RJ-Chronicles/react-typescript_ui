import {
  GSTValues,
  User,
  AmphareSize,
  BatteryNameValues,
  StoredCartItemsProps,
  DeleteModalProps,
  State,
  FormProps,
  UserLoggedIn,
} from "./type";

export type Action =
  | { type: "ADD_TOKEN"; payload: string | undefined }
  | { type: "ADD_USER"; payload: User }
  | { type: "ADD_GST_VALUES"; payload: GSTValues[] }
  | { type: "ADD_AMPHERE_VALUES"; payload: AmphareSize[] }
  | { type: "ADD_BATTERY_NAMES"; payload: BatteryNameValues[] }
  | { type: "ADD_STORED_CART_ITEMS"; payload: StoredCartItemsProps }
  | { type: "ADD_DELETE_FORM_PROPS"; payload: DeleteModalProps }
  | { type: "ADD_FORM_PROPS"; payload: FormProps }
  | { type: "REFRESH_EFFECT"; payload: boolean }
  | { type: "SET_LOGGED_IN"; payload: boolean }
  | { type: "SET_MODAL_VISIBLE"; payload: boolean }
  | { type: "SET_DELETE_MODAL_VISIBLE"; payload: boolean }
  | { type: "SET_ERROR"; payload: { hasError: boolean; message: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "USER_LOG_IN"; payload: UserLoggedIn };

export type Dispatch = (action: Action) => void;

const AppReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_GST_VALUES":
      return {
        ...state,
        GST: action.payload,
      };
    case "ADD_AMPHERE_VALUES":
      return {
        ...state,
        amphere: action.payload,
      };
    case "ADD_BATTERY_NAMES":
      return {
        ...state,
        batteryNames: action.payload,
      };
    case "ADD_STORED_CART_ITEMS":
      return {
        ...state,
        storedCartItems: action.payload,
      };
    case "ADD_DELETE_FORM_PROPS":
      return {
        ...state,
        deleteModalFormProps: action.payload,
      };
    case "ADD_FORM_PROPS":
      return {
        ...state,
        formProps: action.payload,
      };
    case "REFRESH_EFFECT":
      return {
        ...state,
        refreshEffect: action.payload,
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_MODAL_VISIBLE":
      return {
        ...state,
        isModalVisible: action.payload,
      };
    case "SET_DELETE_MODAL_VISIBLE":
      return {
        ...state,
        isDeleteModalVisible: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: {
          hasError: action.payload.hasError,
          message: action.payload.message,
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "USER_LOG_IN":
      return {
        ...state,
        loggedIn: action.payload,
      };
    default:
      return state;
  }
};
export default AppReducer;

// export const calculateRemainingTime = (expirationTime: any) => {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();

//   const remainingDuration = adjExpirationTime - currentTime;
//   return remainingDuration;
// };

// export const reriveStoredToken = () => {
//   const storedToken = localStorage.getItem("token");
//   const storedExpirationDate = localStorage.getItem("expirationTime");
//   const storedUser = localStorage.getItem("user");
//   let parsedStoredUser = "";
//   if (storedUser) {
//     if (JSON.parse(storedUser)) {
//       parsedStoredUser = JSON.parse(storedUser);
//     }
//   }

//   const remainingTime = calculateRemainingTime(storedExpirationDate);
//   if (remainingTime <= 60000) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("expirationTime");
//     localStorage.removeItem("user");
//     return null;
//   }
//   return {
//     token: storedToken,
//     duration: remainingTime,
//     user: parsedStoredUser,
//   };
// };
