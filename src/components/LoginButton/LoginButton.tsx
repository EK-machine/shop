import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './style.module.css';
import Profile from '../../../public/profile.svg';
import { setModalRegister, setModalLogin, setModalOpen } from '../../redux/slices/modalContentSlice';
import { isLogged } from '../../redux/slices/commonStateSlice';
import { unsetUser } from '../../redux/slices/userProfileSlice';
import { AppStateType } from '../../interfaces/intefaces';
import { base, settings } from '../../data/data';

const LoginButton: React.FC = () => {
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const userImg = useSelector((state: AppStateType) => state.user.imgUrl);
  const dispatch = useDispatch();
  const history = useHistory();

  const openLoginModal = () => {
    dispatch(setModalOpen(true));
    dispatch(setModalLogin());
  };

  const openRegisterModal = () => {
    dispatch(setModalOpen(true));
    dispatch(setModalRegister());
  };

  const logOut = () => {
    history.push('/');
    dispatch(isLogged(false));
    dispatch(unsetUser());
  };

  return (
    <div className={styles.loginBtnsContainer}>
      <img className={styles.loginIcon} src={logged && userImg ? userImg : Profile} alt="login" />
      <div className={styles.loginBtnsWrapper}>
        {logged ? (
          <>
            <NavLink className={styles.link} to={base + settings}>
              settings
            </NavLink>
            <Button usual underlined type="button" text="log out" onClick={logOut} />
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
