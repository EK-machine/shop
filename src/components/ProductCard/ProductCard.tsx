import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, ProductType } from '../../interfaces/intefaces';
import styles from './style.module.css';
import Button from '../Button/Button';
import { setModalOpen, setModalProduct } from '../../redux/slices/modalContentSlice';
import { setProduct } from '../../redux/slices/allProductsSlice';

const ProductCard: React.FC<ProductType> = ({ title, price, category, image }) => {
  const [inCart, setInCart] = useState<boolean>(false);
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const userCart = useSelector((state: AppStateType) => logged && state.user.user.cart);
  const products = useSelector((state: AppStateType) => state.products.products);
  const dispatch = useDispatch();

  const getSelected = () => {
    const selected = products.find((item) => item.title === title);
    if (selected) {
      dispatch(setProduct(selected));
    }
  };

  const openModal = () => {
    getSelected();
    dispatch(setModalOpen(true));
    dispatch(setModalProduct());
  };

  const productInCart = (val: string) => {
    if (userCart && userCart.length > 0) {
      const inside = userCart.find((item) => item.title === val);
      if (inside && Object.keys(inside).length > 0) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
  };

  useEffect(() => {
    if (title) {
      productInCart(title);
    }
  }, [title]);

  return (
    <div className={styles.productContainer}>
      <h1 className={styles.productTitle}>{title}</h1>
      <div className={styles.productPriceImg}>
        <img src={image} alt={title} className={styles.productImg} />
        <div>
          <p className={styles.productPrice}>{`price: ${price} $`}</p>
          <p className={styles.productCategory}>{category}</p>
        </div>
      </div>
      <div className={`${styles.btnContainer} ${logged ? '' : styles.btnsCentered}`}>
        {logged ? (
          <>
            {inCart ? (
              <Button usual underlined text="remove from cart" type="button" onClick={() => console.log('removed')} />
            ) : (
              <Button usual text="add to cart" type="button" onClick={() => console.log('added')} />
            )}
            <Button usual underlined text="more detail" type="button" onClick={openModal} />
          </>
        ) : (
          <Button usual underlined text="more detail" type="button" onClick={openModal} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
