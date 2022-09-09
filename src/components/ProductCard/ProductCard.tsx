import React, { useState } from 'react';
import { ProductType } from '../../interface/intefaces';
import styles from './style.module.css';
import Button from '../Button/Button';
import ModalContainer from '../ModalContainer/ModalContainer';
import useScreenWidth from '../../hooks/useScreenWidth';
import ModalProduct from '../ModalProduct/ModalProduct';

const ProductCard: React.FC<ProductType> = ({ id, title, price, category, description, image, rating }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile: boolean = useScreenWidth() < 768;

  const toggleModal = (value: boolean) => () => {
    setIsOpen(value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className={styles.productContainer}>
      <h1 className={styles.productTitle}>{title}</h1>
      <div className={styles.productPriceImg}>
        <img src={image} alt={title} className={styles.productImg} />
        <div>
          <p className={styles.productPrice}>{`price: ${price} $`}</p>
          <p className={styles.productCategory}>{category}</p>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button usual text="add to cart" type="button" onClick={() => console.log('added')} />
        <Button usual underlined text="more detail" type="button" onClick={openModal} />
      </div>
      <ModalContainer
        text="product description"
        crossButton
        anchor={isMobile ? 'bottom' : 'right'}
        open={isOpen}
        toggleModal={toggleModal}
      >
        <ModalProduct
          id={id}
          title={title}
          price={price}
          category={category}
          description={description}
          image={image}
          rating={rating}
        />
      </ModalContainer>
    </div>
  );
};

export default ProductCard;
