import { useContext } from "react";
import AuthContext from "../../context/appContext";
const Payment = () => {
  const appContext = useContext(AuthContext) as any;
  const cartItems = appContext.cartItems;
  console.log(cartItems);
  return <h1>Hello</h1>;
};

export default Payment;
