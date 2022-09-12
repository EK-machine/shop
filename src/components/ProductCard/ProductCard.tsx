import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, ProductType } from '../../interface/intefaces';
import styles from './style.module.css';
import Button from '../Button/Button';
import { setModalOpen, setModalProduct } from '../../redux/slices/modalContentSlice';
import { setProduct } from '../../redux/slices/allProductsSlice';

const ProductCard: React.FC<ProductType> = ({ title, price, category, image }) => {
  const logged = useSelector((state: AppStateType) => state.common.logged);
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
            <Button usual text="add to cart" type="button" onClick={() => console.log('added')} />
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
