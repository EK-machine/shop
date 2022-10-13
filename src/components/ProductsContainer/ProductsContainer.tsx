import React from 'react';
import ProductCard from 'Components/ProductCard/ProductCard';
import { ProductsContainerProps } from 'Interfaces/intefaces';
import styles from './style.module.css';

const ProductsContainerUnmemoized: React.FC<ProductsContainerProps> = ({ toDisplay }) => (
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

const areEqual = (prevProps: ProductsContainerProps, nextProps: ProductsContainerProps) => {
  const prevProds = prevProps.toDisplay.map((item) => item.title).join();
  const nextProds = nextProps.toDisplay.map((item) => item.title).join();
  if (prevProds === nextProds) {
    return true;
  }
  return false;
};

const ProductsContainer = React.memo(ProductsContainerUnmemoized, areEqual);

export default ProductsContainer;
