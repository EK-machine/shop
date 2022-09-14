import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { apiGetProduct } from '../../api/apis';
import styles from './style.module.css';
import { AppStateType } from '@/interfaces/intefaces';
import ProductLine from '../ProductLine/ProductLine';
import { setAllProducts, setProduct } from '../../redux/slices/allProductsSlice';
import { setModalProduct, setModalOpen } from '../../redux/slices/modalContentSlice';
import useOutsideClick from '../../hooks/useOutsideClick';

const FilterBlock: React.FC = () => {
  const products = useSelector((state: AppStateType) => state.products.products);
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

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
      const selected = products.find((item) => item.title === title);
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
  const debounced = debounce(updateQuery, 300);

  useEffect(() => {
    const getProduct = async (string: string) => {
      const prod = await apiGetProduct(string);
      if (prod) {
        dispatch(setAllProducts(prod));
      }
    };
    getProduct(query);
  }, [query]);

  return (
    <div className={styles.container}>
      <div ref={resultRef} className={styles.iputWrapper}>
        <input
          className={`${styles.input} ${query !== '' && open ? styles.withQuery : ''}`}
          placeholder="Search product..."
          type="text"
          title="Search products"
          onChange={debounced}
          onFocus={onFocusHandler}
        />
        {query !== '' && products && open && (
          <div className={styles.productslist}>
            {products.map((product) => (
              <ProductLine getSelected={getSelected} key={product.title} title={product.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBlock;
