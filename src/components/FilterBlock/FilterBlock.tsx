import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClick from '../../hooks/useOutsideClick';
import ProductLine from '../ProductLine/ProductLine';
import styles from './style.module.css';
import { setProduct, debounceProductsRequest } from '../../redux/slices/allProductsSlice';
import { setModalProduct, setModalOpen } from '../../redux/slices/modalContentSlice';
import { setProductsHeading, setHeading } from '../../redux/slices/headingSlice';
import { AppStateType } from '@/interfaces/intefaces';
import { locationProducts } from '../../helpers/utils';
import { HeaderProps } from '../../interfaces/intefaces';

const FilterBlock: React.FC<HeaderProps> = ({ productCategory }) => {
  const displayProducts = useSelector((state: AppStateType) => state.products.displayProducts);
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const location = useLocation();

  const dispatch = useDispatch();

  const resultRef = useRef(null);

  const close = () => {
    setOpen(false);
  };

  useOutsideClick(resultRef, close);

  const onFocusHandler = () => {
    setOpen(true);
  };

  const getSelected = (title: string) => {
    if (title) {
      const selected = displayProducts.find((item) => item.title === title);
      if (selected) {
        dispatch(setProduct(selected));
        dispatch(setModalProduct());
        dispatch(setModalOpen(true));
      }
    }
  };

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e?.target?.value);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(debounceProductsRequest(query));
  }, [query]);

  useEffect(() => {
    if (locationProducts(location.pathname) && productCategory) {
      if (query !== '') {
        const categoryString = productCategory.split(' ')[0];
        const payload = { category: categoryString, query };
        dispatch(setProductsHeading(payload));
      } else {
        dispatch(setHeading(productCategory));
      }
    }
  }, [query, location.pathname, productCategory]);

  return (
    <div className={styles.container}>
      <div ref={resultRef} className={styles.iputWrapper}>
        <input
          className={`${styles.input} ${query !== '' && open ? styles.withQuery : ''}`}
          placeholder="Search product..."
          type="text"
          title="Search products"
          onChange={updateQuery}
          onFocus={onFocusHandler}
        />
        {query !== '' && displayProducts && open && (
          <div className={styles.productslist}>
            {displayProducts.map((product) => (
              <ProductLine getSelected={getSelected} key={product.title} title={product.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBlock;
