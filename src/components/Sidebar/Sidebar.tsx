import React from 'react';
import { categoryIcons, cartSideData, setSideData } from 'Data/data';
import Button from 'Components/Button/Button';
import { SidebarProps } from 'Interfaces/intefaces';
import { categorySidebarPropsEqual } from 'Helpers/utils';
import '../../common.css';

const SidebarUnmemoized: React.FC<SidebarProps> = ({
  filterByCategory,
  categories,
  products,
  settings,
  cart,
  active,
}) => (
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

const areEqual = (prevProps: SidebarProps, nextProps: SidebarProps) => {
  const res = categorySidebarPropsEqual(prevProps, nextProps);
  return res;
};

const Sidebar = React.memo(SidebarUnmemoized, areEqual);

export default Sidebar;
