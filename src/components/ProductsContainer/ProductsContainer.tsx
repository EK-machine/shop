import React from 'react';
import styles from './style.module.css';
import ProductCard from '../ProductCard/ProductCard';

import { ProductsContainerProps } from '../../interfaces/intefaces';

const ProductsContainer: React.FC<ProductsContainerProps> = ({ toDisplay }) => (
  <div className={styles.productsContainer}>
    <div className={styles.shadowContainer}>
      <div className={styles.products}>
        {toDisplay &&
          toDisplay.length > 0 &&
          toDisplay.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              category={item.category}
              description={item.description}
              image={item.image}
              rating={item.rating}
            />
          ))}
      </div>
    </div>
  </div>
);

export default ProductsContainer;
