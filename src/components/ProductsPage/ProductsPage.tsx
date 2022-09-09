import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { apiGetProduct } from '../../api/apis';
import styles from './style.module.css';
import ProductCard from '../ProductCard/ProductCard';
import FilterBlock from '../FilterBlock/FilterBlock';
import { ProductType } from '../../interface/intefaces';

const ProductsPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [most, setMost] = useState<ProductType>({
    id: 0,
    title: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e?.target?.value);
  };
  const debounced = debounce(updateQuery, 300);

  const mostPurchased = () => {
    const mostPurchasedProduct =
      products &&
      products.length > 0 &&
      products.reduce((more, less) => (more.rating.count >= less.rating.count ? more : less));
    if (mostPurchasedProduct) {
      setMost(mostPurchasedProduct);
    }
  };

  useEffect(() => {
    mostPurchased();
  }, [products]);

  useEffect(() => {
    const getProduct = async (string: string) => {
      const prod = await apiGetProduct(string);
      if (prod) {
        setProducts(prod);
      }
    };
    getProduct(query);
  }, [query]);

  return (
    <div className={styles.productsPageContainer}>
      <FilterBlock
        onChange={debounced}
        image={most.image}
        title={most.title}
        rating={most.rating}
        id={most.id}
        price={most.price}
        category={most.category}
        description={most.description}
      />
      <div className={styles.productsContainer}>
        {products &&
          products.length > 0 &&
          products.map((item) => (
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
  );
};

export default ProductsPage;
