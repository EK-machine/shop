import React from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.css';
import CartItem from '../CartItem/CartItem';
import { AppStateType } from '../../interfaces/intefaces';

const Cart: React.FC = () => {
  const userCart = useSelector((state: AppStateType) => state.user.cart);
  return (
    <div className={styles.cart}>
      {userCart.map((item) => (
        <CartItem key={item.title} image={item.image} title={item.title} quantity={item.quantity} price={item.price} />
      ))}
    </div>
  );
};

export default Cart;
