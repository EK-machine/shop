/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { CartItemProps, AppStateType, UserCartItem } from '../../interfaces/intefaces';
import Button from '../Button/Button';
import { deleteFromCartRequest, changeQuantityRequest } from '../../redux/slices/userSlice';

const CartItem: React.FC<CartItemProps> = ({
  image,
  title,
  quantity,
  price,
  id,
  category,
  description,
  rating,
  onClick,
  addAction,
}) => {
  const userCart = useSelector((state: AppStateType) => state.user.user.cart);
  const user = useSelector((state: AppStateType) => state.user.user);
  const [productQuantity, setProductQuantity] = useState<string>(quantity.toString());
  const dispatch = useDispatch();

  const addRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    const newCart = userCart.filter((item) => item.title !== title);
    const payload = { id: user && user.id, cart: newCart };
    dispatch(
      deleteFromCartRequest(
        payload as {
          id: number;
          cart: UserCartItem[];
        },
      ),
    );
  };

  const onChangeHandler = (val: string) => {
    const newQuantity = Number(val);
    const newQuantityProduct = {
      id,
      title,
      price,
      category,
      description,
      image,
      rating,
      quantity: newQuantity,
    };
    const newnewCart = userCart.map((item) => {
      if (item.title !== title) {
        return item;
      }
      return newQuantityProduct;
    });
    const payload = { id: user && user.id, cart: newnewCart };
    dispatch(changeQuantityRequest(payload));
  };

  useEffect(() => {
    onChangeHandler(productQuantity);
  }, [productQuantity]);

  return (
    <div
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
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
      <div className={styles.delete}>
        <Button usual underlined text="remove from cart" type="button" onClick={addRemove} />
      </div>
      <div className={styles.priceQuantity}>
        <div className={styles.quantityWrapper} onClick={(e) => e.stopPropagation()}>
          <p className={styles.cartItemQuantity}>Quantity: </p>
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
      </div>
    </div>
  );
};

export default CartItem;
