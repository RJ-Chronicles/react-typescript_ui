import { useContext } from "react";
import AuthContext from "../../context/appContext";
import Invoice from "../UI/Invoice";
const Payment = () => {
  const appContext = useContext(AuthContext) as any;
  const cartItems = appContext.cartItems;
  console.log(cartItems);
  return <Invoice />;
};

export default Payment;
