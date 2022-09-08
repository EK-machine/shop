import React, { useState, useEffect } from 'react';
import { apiGetProducts } from '../../api/apis';
import styles from './style.module.css';
import ProductCard from '../ProductCard/ProductCard';
// import Input from '../Input/Input';
import { ProductType } from '../../interface/intefaces';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchAllProducts = async () => {
    const data = await apiGetProducts();
    if (data) {
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className={styles.productsPageContainer}>
      {/* {products && products.length > 0 && <Input />} */}
      <div className={styles.productsContainer}>
        {products &&
          products.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              category={item.category}
              description={item.description}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductsPage;
