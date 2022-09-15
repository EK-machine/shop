import React from 'react';
import { categoryIcons, cartSideData, setSideData } from '../../data/data';
import Button from '../Button/Button';
import { SidebarProps } from '../../interfaces/intefaces';
import '../../common.css';

const Sidebar: React.FC<SidebarProps> = ({ filterByCategory, categories, products, settings, cart, active }) => (
  <div className="sidebar">
    {products && (
      <>
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
      </>
    )}
    {cart && (
      <>
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
      </>
    )}
    {settings && (
      <>
        {setSideData.map((data, i) => (
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
      </>
    )}
  </div>
);

export default Sidebar;
