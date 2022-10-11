import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';
import MostSlider from '../MostSlider/MostSlider';
import useOutsideClick from '../../hooks/useOutsideClick';
import { AppStateType, ProductType } from '../../interfaces/intefaces';
import { setProduct } from '../../redux/slices/allProductsSlice';
import { setModalOpen, setModalProduct } from '../../redux/slices/modalContentSlice';
import { setHeading } from '../../redux/slices/headingSlice';
import Input from '../Input/Input';
import { setOrderRequest } from '../../redux/slices/userSlice';

const Cart: React.FC = () => {
  const [isDateSetter, setIsDateSetter] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [prodCategs, setProdCategs] = useState<ProductType[][]>([]);
  const [most, setMost] = useState<ProductType[]>([]);
  const userCart = useSelector((state: AppStateType) => state.user.user.cart);
  const products = useSelector((state: AppStateType) => state.products.products);
  const orders = useSelector((state: AppStateType) => state.user.user.orders);
  const user = useSelector((state: AppStateType) => state.user.user);
  const pending = useSelector((state: AppStateType) => state.pending.pending.find((item) => item.id === 0))?.pending;
  const dispatch = useDispatch();
  const cartRef = useRef(null);

  const setCategs = (data: ProductType[]) => {
    const all = Array.from(new Set(data.map((cat) => cat.category)));
    setCategories(all);
  };

  const getProductsPeCategory = () => {
    const arr: ProductType[][] = [];
    categories.forEach((categ) => {
      const items = products.filter((item) => item.category === categ);
      arr.push(items);
    });
    setProdCategs(arr);
  };

  const mostPurchased = (arr: ProductType[]) => {
    const mostPurchasedProduct = arr.reduce((more, less) => (more.rating.count >= less.rating.count ? more : less));
    return mostPurchasedProduct;
  };

  const getMostPurchasedArr = () => {
    const productsArr: ProductType[] = [];
    prodCategs.forEach((item) => {
      const result = mostPurchased(item);
      productsArr.push(result);
    });
    setMost(productsArr);
  };

  const closeDate = () => {
    setIsDateSetter(false);
  };

  useOutsideClick(cartRef, closeDate);

  const showDateSetter = useCallback(() => {
    const shown = isDateSetter;
    setIsDateSetter(!shown);
  }, []);

  const getSelected = useCallback((val: string) => {
    const selected = products.find((item) => item.title === val);
    if (selected) {
      dispatch(setProduct(selected));
    }
  }, []);

  const openModal = useCallback(() => {
    dispatch(setModalOpen(true));
    dispatch(setModalProduct());
  }, []);

  const placeOrder = () => {
    if (userCart && userCart.length > 0 && date !== '') {
      const latestId = () => {
        if (orders.length > 0) {
          return orders.length + 1;
        }
        return 1;
      };
      const orderItem = { dateTill: date, id: latestId(), items: userCart };
      const newOrders = orders.concat(orderItem);
      const payload = { id: user && user.id, orders: newOrders, prodId: 0 };
      dispatch(setOrderRequest(payload));
    }
  };

  const orderHandler = useCallback(() => {
    placeOrder();
    closeDate();
  }, [userCart, orders, date, user.id]);

  useEffect(() => {
    setCategs(products);
  }, [products]);

  useEffect(() => {
    getProductsPeCategory();
  }, [categories]);

  useEffect(() => {
    getMostPurchasedArr();
  }, [prodCategs]);

  useEffect(() => {
    if (userCart && userCart.length === 0) {
      dispatch(setHeading('Your cart is empty'));
    } else {
      dispatch(setHeading('Your cart'));
    }
  }, [userCart]);

  return (
    <div className={styles.cart}>
      {userCart && userCart.length === 0 ? (
        <MostSlider products={most} getSelected={getSelected} openModal={openModal} />
      ) : (
        <>
          <div className={styles.buttonWrapper}>
            {!isDateSetter && (
              <Button onClick={showDateSetter} loading pending={pending} underlined type="button" text="Place order" />
            )}
            {isDateSetter && (
              <form ref={cartRef} className={styles.dateForm} onSubmit={orderHandler}>
                <Button text="Place order" disabled={date === ''} loading pending={pending} type="submit" />
                <Input forId="date" type="date" title="Set delivery date" value={date} setDate={setDate} />
              </form>
            )}
          </div>
          <div className={`${styles.cartItemsContainer} ${isDateSetter ? styles.cartItemsContainerSetter : ''}`}>
            <div className={`${styles.cartItemsShadow} ${isDateSetter ? styles.cartItemsShadowSetter : ''}`}>
              {userCart &&
                userCart.map((item) => (
                  <CartItem
                    onClick={openModal}
                    addAction={getSelected}
                    key={item.title}
                    image={item.image}
                    title={item.title}
                    quantity={item.quantity}
                    price={item.price}
                    id={item.id}
                    category={item.category}
                    description={item.description}
                    rating={item.rating}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
