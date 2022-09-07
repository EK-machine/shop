import React from 'react';
import { ProductType } from '../../interface/intefaces';
import styles from './style.module.css';
import Button from '../Button/Button';

const ProductCard: React.FC<ProductType> = ({ id, title, price, category, description, image }) => (
  <div className={styles.productContainer}>
    <h1 className={styles.productTitle}>{title}</h1>
    <h2 className={styles.productPrice}>{price}</h2>
    <p className={styles.productCategory}>{category}</p>
    <p className={styles.productDesc}>{description}</p>
    <p className={styles.productNumber}>{id}</p>
    <img src={image} alt={title} className={styles.productImg} />
    <div className={styles.btnContainer}>
      <Button underlined text="add to cart" onClick={() => console.log('product')} />
    </div>
  </div>
);

export default ProductCard;
