import React from 'react';
import styles from './style.module.css';
import { FilterBlockProps } from '@/interface/intefaces';
import ProductLine from '../ProductLine/ProductLine';

const FilterBlock: React.FC<FilterBlockProps> = ({ onChange, products, query, getSelected }) => (
  <div className={styles.container}>
    <div className={styles.iputWrapper}>
      <input
        className={`${styles.input} ${query !== '' ? styles.withQuery : ''}`}
        placeholder="Search product..."
        type="text"
        title="Search products"
        onChange={onChange}
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

export default FilterBlock;
