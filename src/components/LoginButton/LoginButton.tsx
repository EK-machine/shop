import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import styles from './style.module.css';
import Profile from '../../../public/profile.svg';
import { setModalRegister, setModalLogin, setModalOpen } from '../../redux/slices/modalContentSlice';
import { AppStateType } from '../../interface/intefaces';

const LoginButton: React.FC = () => {
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const userImg = useSelector((state: AppStateType) => state.user.imgUrl);
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
      <img className={styles.loginIcon} src={logged && userImg ? userImg : Profile} alt="login" />
      <div className={styles.loginBtnsWrapper}>
        {logged ? (
          <>
            <Button usual underlined type="button" text="settings" onClick={() => console.log('settings')} />
            <Button usual underlined type="button" text="log out" onClick={() => console.log('log out')} />
          </>
        ) : (
          <>
            <Button usual underlined type="button" text="register" onClick={openRegisterModal} />
            <Button usual underlined type="button" text="login" onClick={openLoginModal} />
          </>
        )}
      </div>
    </div>
  );
};

export default LoginButton;
