import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './style.module.css';
import Profile from '../../../public/profile.svg';
import { setModalRegister, setModalLogin, setModalOpen } from '../../redux/slices/modalContentSlice';
import { isLogged } from '../../redux/slices/commonStateSlice';
import { unsetUser } from '../../redux/slices/userSlice';
import { unsetAllErrors } from '../../redux/slices/errorSlice';
import { AppStateType } from '../../interfaces/intefaces';
import { base, settings, navigationLinks } from '../../data/data';

const LoginButtonUnmemoized: React.FC = () => {
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const userImg = useSelector((state: AppStateType) => logged && state.user.user.imgUrl);
  const dispatch = useDispatch();
  const history = useHistory();

  const openLoginModal = useCallback(() => {
    dispatch(setModalOpen(true));
    dispatch(setModalLogin());
  }, [dispatch]);

  const openRegisterModal = useCallback(() => {
    dispatch(setModalOpen(true));
    dispatch(setModalRegister());
  }, [dispatch]);

  const logOut = useCallback(() => {
    history.push('/');
    dispatch(isLogged(false));
    dispatch(unsetUser());
    dispatch(unsetAllErrors());
  }, [dispatch]);

  return (
    <div className={styles.loginBtnsContainer}>
      <img className={styles.loginIcon} src={logged && userImg ? userImg : Profile} alt="login" />
      <div className={logged ? styles.loginBtnsWrapper : styles.loginBtnsWrapperUnlogged}>
        {logged ? (
          <>
            {navigationLinks.map((item) => (
              <NavLink className={styles.moblink} key={item.name} to={item.link}>
                {item.name}
              </NavLink>
            ))}
            <NavLink className={styles.link} to={base + settings}>
              settings
            </NavLink>
            <Button usual underlined type="button" text="log out" onClick={logOut} />
          </>
        ) : (
          <>
            <Button usual underlined type="button" text="register" onClick={openRegisterModal} />
            <Button usual underlined type="button" text="login" onClick={openLoginModal} />
            {[navigationLinks[1]].map((item) => (
              <NavLink className={styles.moblink} key={item.name} to={item.link}>
                {item.name}
              </NavLink>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const LoginButton = React.memo(LoginButtonUnmemoized);

export default LoginButton;
