import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { apiGetProduct } from '../../api/apis';
import styles from './style.module.css';
import { AppStateType } from '@/interface/intefaces';
import ProductLine from '../ProductLine/ProductLine';
import { setAllProducts, setProduct } from '../../redux/slices/allProductsSlice';
import { setModalProduct, setModalOpen } from '../../redux/slices/modalContentSlice';

const FilterBlock: React.FC = () => {
  const products = useSelector((state: AppStateType) => state.products.products);
  const [query, setQuery] = useState<string>('');

  const dispatch = useDispatch();

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
      <div className={styles.iputWrapper}>
        <input
          className={`${styles.input} ${query !== '' ? styles.withQuery : ''}`}
          placeholder="Search product..."
          type="text"
          title="Search products"
          onChange={debounced}
        />
        {query !== '' && products && (
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
