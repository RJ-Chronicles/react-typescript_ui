import { useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
interface CartProps {
  numberOfCartItems: number;
}
const HeaderCartButton = (props: CartProps) => {
  const [btnIsHighLighted, setButtonIsHighLighted] = useState(false);

  const { numberOfCartItems } = props;
  const btnClasses = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ""
  }`;
  const items = 0;
  useEffect(() => {
    setButtonIsHighLighted(true);
    const timer = setTimeout(() => {
      setButtonIsHighLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const handleCartOnclick = () => {
    console.log("Clicked!");
  };
  return (
    <button className={btnClasses} onClick={handleCartOnclick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Card</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
