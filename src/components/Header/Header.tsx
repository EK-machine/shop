import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderProps } from '../../interface/intefaces';
import { navigationLinks, base } from '../../data/data';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import useScreenWidth from '../../hooks/useScreenWidth';
import Button from '../Button/Button';
import styles from './style.module.css';
import Logo from '../../../public/logo.svg';

const Header: React.FC<HeaderProps> = ({ logged }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile: boolean = useScreenWidth() < 768;

  const toggleModal = (value: boolean) => () => {
    setIsOpen(value);
  };

  const openSignIn = () => {
    setIsOpen(true);
  };

  return (
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
      <Button text="sign in" onClick={openSignIn} />
      <ModalWrapper crossButton anchor={isMobile ? 'bottom' : 'right'} open={isOpen} toggleModal={toggleModal}>
        <div>11111111111111</div>
      </ModalWrapper>
    </div>
  );
};

export default Header;
