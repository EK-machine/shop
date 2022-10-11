import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppStateType, HeaderProps } from '../../interfaces/intefaces';
import { navigationLinks, base } from '../../data/data';
import LoginButton from '../LoginButton/LoginButton';
import styles from './style.module.css';
import Logo from '../../../public/logo.png';
import FilterBlock from '../FilterBlock/FilterBlock';

const HeaderUnmemoized: React.FC<HeaderProps> = ({ productCategory }) => {
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const heading = useSelector((state: AppStateType) => state.heading.heading);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerMainContent}>
        <div className={styles.logoSearch}>
          <NavLink className={styles.logoWrapper} to={base}>
            <img className={styles.logo} src={Logo} alt="logo" />
          </NavLink>
          <div className={styles.filterWrapper}>
            <FilterBlock productCategory={productCategory} />
          </div>
        </div>
        <div className={styles.links}>
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
      </div>
      <div className={styles.headingContent}>
        <h1 className={styles.heading}>{heading}</h1>
      </div>
      <div className={styles.filterWrapperMob}>
        <FilterBlock productCategory={productCategory} />
      </div>
    </div>
  );
};

const Header = React.memo(HeaderUnmemoized);

export default Header;
