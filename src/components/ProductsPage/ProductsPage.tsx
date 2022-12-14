import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'Components/Layout/Layout';
import Button from 'Components/Button/Button';
import Sidebar from 'Components/Sidebar/Sidebar';
import ProductsContainer from 'Components/ProductsContainer/ProductsContainer';
import { AppStateType, ProductType } from 'Interfaces/intefaces';
import { setProduct } from 'ReduxSlices/allProductsSlice';
import { setModalOpen, setModalProduct } from 'ReduxSlices/modalContentSlice';
import { setHeading } from 'ReduxSlices/headingSlice';
import styles from './style.module.css';
import '../../common.css';

const ProductsPageUnmemoized: React.FC = () => {
  const products = useSelector((state: AppStateType) => state.products.products);
  const displayProducts = useSelector((state: AppStateType) => state.products.displayProducts);
  const most = useSelector((state: AppStateType) => state.products.product);
  const [toDisplay, setToDisplay] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState<number>(0);

  const dispatch = useDispatch();

  const setCategs = (data: ProductType[]) => {
    const all = data && data.length > 0 && Array.from(new Set(data.map((cat) => cat.category)));
    all && all.length > 0 && all.unshift('all products');
    all && all.length > 0 && setCategories(all);
  };

  const filterByCategory = (title: string) => {
    if (title === 'all products') {
      setToDisplay(displayProducts);
      setActive(0);
    } else {
      const filtered = displayProducts.filter((prod) => prod.category === title);
      categories.forEach((categ, i) => categ === title && setActive(i));
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

  const getSelected = useCallback(
    (val: string) => {
      const selected = displayProducts.find((item) => item.title === val);
      if (selected) {
        dispatch(setProduct(selected));
      }
    },
    [displayProducts, dispatch],
  );

  const openModal = useCallback(() => {
    dispatch(setModalOpen(true));
    dispatch(setModalProduct());
  }, [dispatch]);

  useEffect(() => {
    setToDisplay(displayProducts);
  }, [displayProducts]);

  useEffect(() => {
    setCategs(products);
  }, [displayProducts]);

  useEffect(() => {
    mostPurchased();
  }, [toDisplay]);

  useEffect(() => {
    dispatch(setHeading('All products'));
  }, []);

  return (
    <Layout productCategory={categories[active]}>
      <Sidebar products active={active} filterByCategory={filterByCategory} categories={categories} />
      <div className="contentBlock">
        <div className={styles.btnContainer}>
          <div className={styles.popular}>
            {most && most.rating && most.rating.count && (
              <p className={styles.preBtnText}>
                Most popular: <span className={styles.span}>{most.rating.count} purchases!</span>
              </p>
            )}
          </div>
          <div className={styles.btn}>
            <Button
              product
              text={most.title}
              image={most.image}
              type="button"
              addAction={getSelected}
              onClick={openModal}
            />
          </div>
        </div>
        <ProductsContainer toDisplay={toDisplay} />
      </div>
    </Layout>
  );
};

const ProductsPage = React.memo(ProductsPageUnmemoized);

export default ProductsPage;
