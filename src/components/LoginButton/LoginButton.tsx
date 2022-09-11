import React from 'react';
import Button from '../Button/Button';
import styles from './style.module.css';
import Profile from '../../../public/profile.svg';
import { LoginButtonProps } from '../../interface/intefaces';

const LoginButton: React.FC<LoginButtonProps> = ({ addAction, onClick }) => (
  <div className={styles.loginBtnsContainer}>
    <img className={styles.loginIcon} src={Profile} alt="login" />
    <div className={styles.loginBtnsWrapper}>
      <Button usual underlined type="button" text="register" addAction={addAction} onClick={onClick} />
      <Button usual underlined type="button" text="log in" addAction={addAction} onClick={onClick} />
    </div>
  </div>
);

export default LoginButton;
