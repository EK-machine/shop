import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import ProductsSidebar from '../ProductsSidebar/ProductsSidebar';
import ProductsContainer from '../ProductsContainer/ProductsContainer';
import styles from './style.module.css';
import { AppStateType, ProductType } from '../../interface/intefaces';
import { setProduct } from '../../redux/slices/allProductsSlice';
import { setModalOpen, setModalProduct } from '../../redux/slices/modalContentSlice';

const ProductsPage: React.FC = () => {
  const products = useSelector((state: AppStateType) => state.products.products);
  const most = useSelector((state: AppStateType) => state.products.product);
  const [toDisplay, setToDisplay] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const dispatch = useDispatch();

  const setCategs = (data: ProductType[]) => {
    const all = Array.from(new Set(data.map((cat) => cat.category)));
    setCategories(all);
  };

  const filterByCategory = (title: string) => {
    if (title === 'all products') {
      setToDisplay(products);
    } else {
      const filtered = products.filter((prod) => prod.category === title);
      setToDisplay(filtered);
    }
  };

  const mostPurchased = () => {
    const mostPurchasedProduct =
      toDisplay &&
      toDisplay.length > 0 &&
      toDisplay.reduce((more, less) => (more.rating.count >= less.rating.count ? more : less));
    if (mostPurchasedProduct) {
      dispatch(setProduct(mostPurchasedProduct));
    }
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
    setToDisplay(products);
    setCategs(products);
  }, [products]);

  useEffect(() => {
    mostPurchased();
  }, [toDisplay]);

  return (
    <div className={styles.productsPageContainer}>
      <ProductsSidebar filterByCategory={filterByCategory} categories={categories} />
      <div className={styles.productsBtn}>
        <div className={styles.btnContainer}>
          <div>
            <p className={styles.preBtnText}>Check out our most popular product!</p>
            <p className={styles.preBtnText}>
              <span className={styles.span}>{most.rating.count}</span> happy purchases
            </p>
          </div>
          <Button
            product
            text={most.title}
            image={most.image}
            type="button"
            addAction={getSelected}
            onClick={openModal}
          />
        </div>
        <ProductsContainer toDisplay={toDisplay} />
      </div>
    </div>
  );
};

export default ProductsPage;
