import React from 'react';
import styles from './style.module.css';
import { categoryIcons } from '../../data/data';
import Button from '../Button/Button';
import { ProductsSidebarProps } from '../../interface/intefaces';

const ProductsSidebar: React.FC<ProductsSidebarProps> = ({ filterByCategory, categories }) => (
  <div className={styles.productCategory}>
    <Button category text="all products" image={categoryIcons[4]} type="button" addAction={filterByCategory} />
    {categories.map((categ, i) => (
      <Button key={categ} category text={categ} image={categoryIcons[i]} type="button" addAction={filterByCategory} />
    ))}
  </div>
);

export default ProductsSidebar;
