import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { locationProducts } from 'Helpers/utils';
import useOutsideClick from 'Hooks/useOutsideClick';
import ProductLine from 'Components/ProductLine/ProductLine';
import { setProduct, debounceProductsRequest } from 'ReduxSlices/allProductsSlice';
import { setModalProduct, setModalOpen } from 'ReduxSlices/modalContentSlice';
import { setProductsHeading, setHeading } from 'ReduxSlices/headingSlice';
import { HeaderProps, AppStateType } from 'Interfaces/intefaces';
import styles from './style.module.css';

const FilterBlockUnmemoized: React.FC<HeaderProps> = ({ productCategory }) => {
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

  const getSelected = useCallback(
    (title: string) => {
      if (title) {
        const selected = displayProducts.find((item) => item.title === title);
        if (selected) {
          dispatch(setProduct(selected));
          dispatch(setModalProduct());
          dispatch(setModalOpen(true));
        }
      }
    },
    [displayProducts],
  );

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
          name="filter"
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

const FilterBlock = React.memo(FilterBlockUnmemoized);

export default FilterBlock;
