import React, { useCallback, useEffect, useState } from "react";

let logoutTimer: any;

const AuthContext = React.createContext<any | null>({
  refreshEffect: false,
  token: "",
  isLoggedIn: false,
  isModalVisible: false,
  formProps: {},
  deleteModalFormProps: {},
  isDeleteModalVisible: false,

  setDeleteModalVisible: () => {},
  setModalVisible: () => {},
  setFormProps: () => {},
  storeCartItems: () => {},
  setDeleteModalFormProps: () => {},
  user: {},
  login: () => {},
  logout: () => {},
  refreshData: () => {},
});

const calculateRemainingTime = (expirationTime: any) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};
const reriveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const storedUser = localStorage.getItem("user");
  let parsedStoredUser = "";
  if (storedUser) {
    if (JSON.parse(storedUser)) {
      parsedStoredUser = JSON.parse(storedUser);
    }
  }

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
    user: parsedStoredUser,
  };
};
export const AuthContextProvider = (props: any) => {
  const tokenData = reriveStoredToken();
  let initialToken;
  let initialUser = {};
  if (tokenData) {
    initialToken = tokenData.token;
    initialUser = tokenData.user || "";
  }
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);
  const [formPropsData, setFormPropsData] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [deleteModalFormProps, setDeleteModalFormProps] = useState({});
  const [isModalShow, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const userIsLoggedIn = !!token;
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token: string, expirationTime: any, user: any) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("user", JSON.stringify(user));

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const [refreshEffect, setModifiedRefreshEffect] = useState(false);
  const refreshEffectHandler = () => {
    setModifiedRefreshEffect(!refreshEffect);
  };

  const setShowModalHandler = (value: boolean) => {
    setIsModalVisible(value);
  };

  const setDeleteModalVisibleHandler = (value: boolean) => {
    setDeleteModalVisible(value);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    refreshData: refreshEffectHandler,
    refreshEffect: refreshEffect,
    user: user,
    setFormProps: setFormPropsData,
    storeCartItems: setCartItems,
    formProps: formPropsData,
    cartItems: cartItems,
    deleteModalFormProps: deleteModalFormProps,
    setModalVisible: setShowModalHandler,
    isModalVisible: isModalShow,
    isDeleteModalVisible: isDeleteModalVisible,
    setDeleteModalVisible: setDeleteModalVisibleHandler,
    setDeleteModalFormProps: setDeleteModalFormProps,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
