import React, { useState, useRef, useEffect } from 'react';
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

const Cart: React.FC = () => {
  const [isDateSetter, setIsDateSetter] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [prodCategs, setProdCategs] = useState<ProductType[][]>([]);
  const [most, setMost] = useState<ProductType[]>([]);
  const userCart = useSelector((state: AppStateType) => state.user.user.cart);
  const products = useSelector((state: AppStateType) => state.products.products);
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
    if (userCart.length === 0) {
      dispatch(setHeading('Your cart is empty'));
    } else {
      dispatch(setHeading('Your cart'));
    }
  }, [userCart]);

  return (
    <div ref={cartRef} className={styles.cart}>
      {userCart.length === 0 ? (
        <MostSlider products={most} getSelected={getSelected} openModal={openModal} />
      ) : (
        <>
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
              id={item.id}
              category={item.category}
              description={item.description}
              rating={item.rating}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;
