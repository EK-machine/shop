import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderProps } from '../interface/intefaces';
import { navigationLinks, base } from '../../data/data';
import styles from './style.module.css';
import Logo from './logo.svg';

const Header: React.FC<HeaderProps> = ({ logged }) => (
  <div className={styles.headerContainer}>
    <NavLink className={styles.logoWrapper} to={base}>
      <img src={Logo} alt="logo" />
    </NavLink>
    {logged &&
      navigationLinks.map((item) => (
        <NavLink className={styles.link} key={item.name} to={item.link}>
          {item.name}
        </NavLink>
      ))}
  </div>
);

export default Header;
