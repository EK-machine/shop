/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import styles from './style.module.css';
import { CartItemProps } from '../../interfaces/intefaces';

const CartItem: React.FC<CartItemProps> = ({ image, title, quantity, price, onClick, addAction }) => {
  const [productQuantity, setProductQuantity] = useState<string>(quantity.toString());

  return (
    <button
      onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick && onClick(event);
        addAction && addAction(title);
      }}
      className={styles.cartItem}
    >
      <div className={styles.itemTitle}>
        <div className={styles.cartItemImgWrapper}>
          <img className={styles.cartItemImg} src={image} alt={title} />
        </div>
        <p className={styles.cartItemTitle}>{title}</p>
      </div>
      <div className={styles.priceQuantity}>
        <div onClick={(e) => e.stopPropagation()}>
          <select
            value={productQuantity}
            onChange={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setProductQuantity(event.target.value);
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <p className={styles.cartItemPrice}>
          Total: <span>{price * quantity} $</span>
        </p>
        <p className={styles.cartItemQuantity}>Quantity: {quantity}</p>
      </div>
    </button>
  );
};

export default CartItem;
