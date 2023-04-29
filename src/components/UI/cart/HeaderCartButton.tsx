import { useEffect, useState } from "react";
import React from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "./CartIcon";
interface CartProps {
  onClick: () => void;
  numberOfCartItems: number;
}
const HeaderCartButton = (props: CartProps) => {
  const [btnIsHighLighted, setButtonIsHighLighted] = useState(false);
  console.log("Caing button");
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
    props.onClick();
  };
  return (
    <button className={btnClasses} onClick={handleCartOnclick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default React.memo(HeaderCartButton);
