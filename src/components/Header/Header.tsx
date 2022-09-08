import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderProps } from '../../interface/intefaces';
import { navigationLinks, base } from '../../data/data';
import ModalContainer from '../ModalContainer/ModalContainer';
import useScreenWidth from '../../hooks/useScreenWidth';
import Button from '../Button/Button';
import styles from './style.module.css';
import Logo from '../../../public/logo.svg';
import ModalLoginRegister from '../ModalLoginRegister/ModalLoginRegister';

const Header: React.FC<HeaderProps> = ({ logged }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const isMobile: boolean = useScreenWidth() < 768;

  const toggleModal = (value: boolean) => () => {
    setIsOpen(value);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const openWithContent = (val: string) => {
    setModalContent(val);
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
      <Button type="button" text="register" addAction={openWithContent} onClick={openModal} />
      <Button type="button" text="log in" addAction={openWithContent} onClick={openModal} />
      <ModalContainer
        text="Create new account"
        crossButton
        anchor={isMobile ? 'bottom' : 'right'}
        open={isOpen}
        toggleModal={toggleModal}
      >
        <ModalLoginRegister modalContent={modalContent} />
      </ModalContainer>
    </div>
  );
};

export default Header;
