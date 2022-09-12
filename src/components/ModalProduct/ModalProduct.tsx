import React from 'react';
import { ModalProductProps } from '../../interface/intefaces';
import styles from './style.module.css';
import StarRate from '../StarRate/StarRate';

const ModalProduct: React.FC<ModalProductProps> = ({ product, text }) => (
  <div className={styles.container}>
    {text && <p className={styles.modalText}>{text}</p>}
    <h1 className={styles.title}>{product.title}</h1>
    <div className={styles.priceImg}>
      <img src={product.image} alt={product.title} className={styles.productImg} />
      <div>
        <p className={styles.price}>{`price: ${product.price} $`}</p>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.reference}>{`Reference No ${product.id}`}</p>
        <div className={styles.ratings}>
          <p className={styles.count}>{`${product.rating.count} purchases`}</p>
          <StarRate rating={Math.ceil(product.rating.rate)} />
        </div>
      </div>
    </div>
    <p className={styles.about}>about the product:</p>
    <p className={styles.description}>{product.description}</p>
  </div>
);

export default ModalProduct;
