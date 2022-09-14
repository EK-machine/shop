import React from 'react';
import styles from './style.module.css';
import { CartItemProps } from '../../interfaces/intefaces';

const CartItem: React.FC<CartItemProps> = ({ image, title, quantity, price }) => (
  <div className={styles.cartItem}>
    <div className={styles.itemTitle}>
      <div className={styles.cartItemImgWrapper}>
        <img className={styles.cartItemImg} src={image} alt={title} />
      </div>
      <p className={styles.cartItemTitle}>{title}</p>
    </div>
    <div className={styles.priceQuantity}>
      <p className={styles.cartItemPrice}>
        Total: <span>{price * quantity} $</span>
      </p>
      <p className={styles.cartItemQuantity}>Quantity: {quantity}</p>
    </div>
  </div>
);

export default CartItem;
