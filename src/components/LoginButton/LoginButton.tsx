import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import styles from './style.module.css';
import Profile from '../../../public/profile.svg';
import { setModalRegister, setModalLogin, setModalOpen } from '../../redux/slices/modalContentSlice';

const LoginButton: React.FC = () => {
  const dispatch = useDispatch();
  const openLoginModal = () => {
    dispatch(setModalOpen(true));
    dispatch(setModalLogin());
  };

  const openRegisterModal = () => {
    dispatch(setModalOpen(true));
    dispatch(setModalRegister());
  };

  return (
    <div className={styles.loginBtnsContainer}>
      <img className={styles.loginIcon} src={Profile} alt="login" />
      <div className={styles.loginBtnsWrapper}>
        <Button usual underlined type="button" text="register" onClick={openRegisterModal} />
        <Button usual underlined type="button" text="login" onClick={openLoginModal} />
      </div>
    </div>
  );
};

export default LoginButton;
