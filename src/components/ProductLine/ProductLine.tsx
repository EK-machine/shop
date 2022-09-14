import React from 'react';
import { ProductLineProps } from '../../interfaces/intefaces';
import styles from './style.module.css';

const ProductLine: React.FC<ProductLineProps> = ({ title, getSelected }) => (
  <div
    role="button"
    tabIndex={0}
    onKeyUp={() => getSelected(title)}
    onClick={() => getSelected(title)}
    className={styles.productLineContainer}
  >
    {title}
  </div>
);

export default ProductLine;
