import AppReducer, { Dispatch } from "./index";
import {
  initialAmphere,
  initialBatteryNames,
  initialDeleteFormProps,
  initialFormProps,
  initialGST,
  initialStoredCartItems,
  initialUser,
  initialUserLoggedIn,
  State,
} from "./type";
import React, { createContext, useReducer } from "react";

const initialState: State = {
  token: "",
  user: initialUser,
  GST: initialGST,
  batteryNames: initialBatteryNames,
  amphere: initialAmphere,
  storedCartItems: initialStoredCartItems,
  deleteModalFormProps: initialDeleteFormProps,
  formProps: initialFormProps,
  refreshEffect: false,
  isLoggedIn: false,
  isModalVisible: false,
  isDeleteModalVisible: false,
  error: { hasError: false, message: "" },
  isLoading: false,
  loggedIn: initialUserLoggedIn,
};

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch;
}>({
  state: initialState,
  dispatch: () => null,
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
