import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import ProductsSidebar from '../ProductsSidebar/ProductsSidebar';
import ProductsContainer from '../ProductsContainer/ProductsContainer';
import { apiGetProducts } from '../../api/apis';
import styles from './style.module.css';
import { ProductType } from '../../interface/intefaces';
import ModalContainer from '../ModalContainer/ModalContainer';
import ModalProduct from '../ModalProduct/ModalProduct';
import useScreenWidth from '../../hooks/useScreenWidth';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [toDisplay, setToDisplay] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const isMobile: boolean = useScreenWidth() < 768;

  const setCategs = (data: ProductType[]) => {
    const all = Array.from(new Set(data.map((cat) => cat.category)));
    setCategories(all);
  };

  const getProducts = async () => {
    const data = await apiGetProducts();
    if (data) {
      setProducts(data);
      setToDisplay(data);
      setCategs(data);
    }
  };

  const filterByCategory = (title: string) => {
    if (title === 'all products') {
      setToDisplay(products);
    } else {
      const filtered = products.filter((prod) => prod.category === title);
      setToDisplay(filtered);
    }
  };

  const mostPurchased = () => {
    const mostPurchasedProduct =
      toDisplay &&
      toDisplay.length > 0 &&
      toDisplay.reduce((more, less) => (more.rating.count >= less.rating.count ? more : less));
    if (mostPurchasedProduct) {
      setMost(mostPurchasedProduct);
    }
  };

  const toggleModal = (value: boolean) => () => {
    setIsOpen(value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    mostPurchased();
  }, [toDisplay]);

  return (
    <div className={styles.productsPageContainer}>
      <ProductsSidebar filterByCategory={filterByCategory} categories={categories} />
      <div className={styles.productsBtn}>
        <div className={styles.btnContainer}>
          <div>
            <p className={styles.preBtnText}>Check out our most popular product!</p>
            <p className={styles.preBtnText}>
              <span className={styles.span}>{most.rating.count}</span> happy purchases
            </p>
          </div>
          <Button product text={most.title} image={most.image} type="button" onClick={openModal} />
        </div>
        <ProductsContainer toDisplay={toDisplay} />
      </div>
      <ModalContainer
        text="Create new account"
        crossButton
        anchor={isMobile ? 'bottom' : 'right'}
        open={isOpen}
        toggleModal={toggleModal}
      >
        <ModalProduct
          id={most.id}
          title={most.title}
          price={most.price}
          category={most.category}
          description={most.description}
          image={most.image}
          rating={most.rating}
        />
      </ModalContainer>
    </div>
  );
};

export default ProductsPage;
