import React from 'react';
import styles from './style.module.css';
import { categoryIcons, cartSideData } from '../../data/data';
import Button from '../Button/Button';
import { SidebarProps } from '../../interfaces/intefaces';

const Sidebar: React.FC<SidebarProps> = ({ filterByCategory, categories, products, cart, active }) => (
  <>
    {products && (
      <div className={styles.productsSidebar}>
        {categories &&
          categories.length > 0 &&
          categories.map((categ, i) => (
            <Button
              key={categ}
              categorySide
              text={categ}
              image={categoryIcons[i]}
              type="button"
              addAction={filterByCategory}
              activeBtn={i === active}
            />
          ))}
      </div>
    )}
    {cart && (
      <div className={styles.cartSidebar}>
        {cartSideData.map((data, i) => (
          <Button
            key={data.copy}
            cartSide
            type="button"
            image={data.icon}
            text={data.copy}
            addAction={filterByCategory}
            activeBtn={i === active}
          />
        ))}
      </div>
    )}
  </>
);

export default Sidebar;
