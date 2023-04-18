import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import React, { useContext, useState } from 'react'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'
const Cart = props => {
    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmitState, setDidSubmitState] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHanlder = id => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = item => {
        cartCtx.addItem(item)
    }
    const orderHandler = () => {
        setIsCheckout(true)
    }
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
         await fetch('https://react-http-68ada-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderdItems: cartCtx.items
            })
        })
        setIsSubmitting(false);
        setDidSubmitState(true)
        cartCtx.clearCart();
    }
    const cartItems = <ul className={classes['cart-items']}>{
        cartCtx.items.map((item) => <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHanlder.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />
        )}
    </ul>
    const modalAction = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
        {!isCheckout && modalAction}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending oreder data...</p>
    const didSubmittedModalContent =<React.Fragment>
         <p>Order placed successfully..</p>
         <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
         </React.Fragment>
    
    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmitState&&   cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmitState && didSubmittedModalContent}
    </Modal>
}
export default Cart;