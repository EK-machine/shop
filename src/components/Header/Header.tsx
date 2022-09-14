import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeaderProps, AppStateType } from '../../interfaces/intefaces';
import { navigationLinks, base } from '../../data/data';
import LoginButton from '../LoginButton/LoginButton';
import styles from './style.module.css';
import Logo from '../../../public/logo.png';
import FilterBlock from '../FilterBlock/FilterBlock';

const Header: React.FC<HeaderProps> = ({ bottomShadow }) => {
  const logged = useSelector((state: AppStateType) => state.common.logged);
  return (
    <div className={`${styles.headerContainer} ${bottomShadow ? styles.bottomShadow : ''}`}>
      <NavLink className={styles.logoWrapper} to={base}>
        <img className={styles.logo} src={Logo} alt="logo" />
      </NavLink>
      <FilterBlock />

      {logged &&
        navigationLinks.map((item) => (
          <NavLink className={styles.link} key={item.name} to={item.link}>
            {item.name}
          </NavLink>
        ))}
      {!logged &&
        [navigationLinks[1]].map((item) => (
          <NavLink className={styles.link} key={item.name} to={item.link}>
            {item.name}
          </NavLink>
        ))}
      <LoginButton />
    </div>
  );
};

export default Header;
