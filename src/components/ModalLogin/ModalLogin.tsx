import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './style.module.css';
import alert from '../Alert/Alert';
import { validateLoginRegister } from '../../helpers/validations';
import { AppStateType, FormErrors, ModalRegisterLogin } from '../../interfaces/intefaces';
import { isLogged } from '../../redux/slices/commonStateSlice';
import { setModalOpen } from '../../redux/slices/modalContentSlice';
import { setUser } from '../../redux/slices/userSlice';
import { setHeading } from '../../redux/slices/headingSlice';

const ModalLogin: React.FC<ModalRegisterLogin> = ({ text }) => {
  const [login, setLogin] = useState<string>('');
  const [pending, setPending] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const modalContent = useSelector((state: AppStateType) => state.modal.content);
  const users = useSelector((state: AppStateType) => state.user.users);
  const history = useHistory();
  const dispatch = useDispatch();

  const submitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const validations = { login, password };
    const formValid = await validateLoginRegister(validations, modalContent);
    setTimeout(() => {
      if (formValid === true) {
        const user = users.find((person) => person.login === login && person.password === password);

        if (user && Object.keys(user).length > 0) {
          alert.success('You have logged in successfully');
          history.push('/cart');
          dispatch(setUser(user));
          dispatch(isLogged(true));
          dispatch(setHeading('Your cart'));
          setPending(false);
          dispatch(setModalOpen(false));
        }
      } else {
        setPending(false);
        setErrors(formValid as FormErrors);
      }
    }, 1500);
  };

  return (
    <form className={styles.wrapper} onSubmit={submitRegister}>
      {text && <p className={styles.modalText}>{text}</p>}
      <div className={styles.inputsContainer}>
        <Input
          value={login}
          title="login"
          required
          requiredMark
          forId="login"
          setValue={setLogin}
          error={errors}
          setError={setErrors}
          type="text"
          content={modalContent}
        />
        <Input
          value={password}
          title="password"
          required
          requiredMark
          forId="password"
          setValue={setPassword}
          error={errors}
          setError={setErrors}
          type="password"
          content={modalContent}
        />
      </div>
      <div className={styles.btnsContainer}>
        <Button loading pending={pending} text={modalContent} type="submit" />
      </div>
    </form>
  );
};

export default ModalLogin;
