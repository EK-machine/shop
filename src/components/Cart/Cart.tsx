import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';
import { AppStateType } from '../../interfaces/intefaces';
import { setProduct } from '../../redux/slices/allProductsSlice';
import { setModalOpen, setModalProduct } from '../../redux/slices/modalContentSlice';
import Input from '../Input/Input';
import useOutsideClick from '../../hooks/useOutsideClick';

const Cart: React.FC = () => {
  const [isDateSetter, setIsDateSetter] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const userCart = useSelector((state: AppStateType) => state.user.cart);
  const products = useSelector((state: AppStateType) => state.products.products);
  const dispatch = useDispatch();
  const cartRef = useRef(null);

  const closeDate = () => {
    setIsDateSetter(false);
  };

  useOutsideClick(cartRef, closeDate);

  const showDateSetter = () => {
    const shown = isDateSetter;
    setIsDateSetter(!shown);
  };

  const getSelected = (val: string) => {
    const selected = products.find((item) => item.title === val);
    if (selected) {
      dispatch(setProduct(selected));
    }
  };

  const openModal = () => {
    dispatch(setModalOpen(true));
    dispatch(setModalProduct());
  };

  return (
    <div ref={cartRef} className={styles.cart}>
      <div className={styles.buttonWrapper}>
        {!isDateSetter && <Button onClick={showDateSetter} usual underlined type="button" text="Place order" />}
        {isDateSetter && (
          <form
            className={styles.dateForm}
            onSubmit={() => {
              console.log('submitted');
              closeDate();
            }}
          >
            <Button usual text="Place order" type="submit" />
            <Input forId="date" type="date" title="Set delivery date" value={date} setValue={setDate} required />
          </form>
        )}
      </div>
      {userCart.map((item) => (
        <CartItem
          onClick={openModal}
          addAction={getSelected}
          key={item.title}
          image={item.image}
          title={item.title}
          quantity={item.quantity}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default Cart;
