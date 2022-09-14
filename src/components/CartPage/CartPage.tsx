import React, { useState } from 'react';
import styles from './style.module.css';
import Sidebar from '../Sidebar/Sidebar';
import Cart from '../Cart/Cart';
import Liked from '../Liked/Liked';
import Orders from '../Orders/Orders';

const CartPage: React.FC = () => {
  const [cartPcontent, setCartPContent] = useState<string>('cart');
  const [active, setActive] = useState<number>(0);

  const setContent = (val: string) => {
    if (val.includes('cart')) {
      setCartPContent('cart');
      setActive(0);
    }
    if (val.includes('liked')) {
      setCartPContent('liked');
      setActive(1);
    }
    if (val.includes('orders')) {
      setCartPContent('orders');
      setActive(2);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContent}>
        <h1 className={styles.cartHeading}>Your cart</h1>
        <div className={styles.cartMain}>
          <Sidebar cart filterByCategory={setContent} active={active} />
          <div className={styles.cartMainContent}>
            {cartPcontent === 'cart' && <Cart />}
            {cartPcontent === 'liked' && <Liked />}
            {cartPcontent === 'orders' && <Orders />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
