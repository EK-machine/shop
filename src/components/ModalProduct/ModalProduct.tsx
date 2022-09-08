import React from 'react';
import { ModalProductProps } from '../../interface/intefaces';
import styles from './style.module.css';
import StarRate from '../StarRate/StarRate';
import Button from '../Button/Button';

const ModalProduct: React.FC<ModalProductProps> = ({ title, price, category, description, id, image, rating }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.priceImg}>
      <img src={image} alt={title} className={styles.productImg} />
      <div>
        <p className={styles.price}>{`price: ${price} $`}</p>
        <p className={styles.category}>{category}</p>
        <p className={styles.reference}>{`Reference No ${id}`}</p>
        <div className={styles.ratings}>
          <p className={styles.count}>{`${rating.count} purchases`}</p>
          <StarRate rating={Math.ceil(rating.rate)} />
        </div>
      </div>
    </div>
    <p className={styles.about}>about the product:</p>
    <p className={styles.description}>{description}</p>
    <div className={styles.btnContainer}>
      <Button underlined text="remove from cart" type="button" onClick={() => console.log('removed')} />
      <Button text="add to cart" type="button" onClick={() => console.log('added')} />
    </div>
  </div>
);

export default ModalProduct;
