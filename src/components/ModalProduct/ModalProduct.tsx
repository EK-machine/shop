import React from 'react';
import { ModalProductProps } from 'Interfaces/intefaces';
import Button from 'Components/Button/Button';
import StarRate from 'Components/StarRate/StarRate';
import styles from './style.module.css';

const ModalProductUnmemoized: React.FC<ModalProductProps> = ({ product, text, logged, like, liked }) => (
  <div className={styles.container}>
    {text && <p className={styles.modalText}>{text}</p>}
    <div className={styles.textBtn}>
      <h1 className={styles.title}>{product.title}</h1>
      {logged && <Button like={like} liked={liked} type="button" text="" />}
    </div>
    <div className={styles.priceImg}>
      <img src={product.image} alt={product.title} className={styles.productImg} />
      <div>
        <p className={styles.price}>{`price: ${product.price} $`}</p>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.reference}>{`Reference No ${product.id}`}</p>
        <p className={styles.count}>{`${product.rating.count} purchases`}</p>
        <StarRate rating={Math.ceil(product.rating.rate)} />
      </div>
    </div>
    <p className={styles.about}>about the product:</p>
    <p className={styles.description}>{product.description}</p>
  </div>
);

const ModalProduct = React.memo(ModalProductUnmemoized);

export default ModalProduct;
