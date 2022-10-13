import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'Components/Input/Input';
import Button from 'Components/Button/Button';
import { validateLoginRegister } from 'Helpers/validations';
import { AppStateType, FormErrors, ModalRegisterLogin } from 'Interfaces/intefaces';
import { isLogged } from 'ReduxSlices/commonStateSlice';
import { setModalOpen } from 'ReduxSlices/modalContentSlice';
import { createUserRequest, setUser } from 'ReduxSlices/userSlice';
import { apiPostError } from 'Apis/apis';
import { setHeading } from 'ReduxSlices/headingSlice';
import alert from 'Components/Alert/Alert';
import styles from './style.module.css';

const ModalLoginRegisterUnmemoized: React.FC<ModalRegisterLogin> = ({ text }) => {
  const [login, setLogin] = useState<string>('');
  const [pending, setPending] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [repeatpassword, setRepeatPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const numberOfUsers = useSelector((state: AppStateType) => state.user.users.length);
  const users = useSelector((state: AppStateType) => state.user.users);
  const modalContent = useSelector((state: AppStateType) => state.modal.content);
  const history = useHistory();
  const dispatch = useDispatch();

  const submitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    if (modalContent === 'register') {
      const validations = { login, password, repeatpassword };
      const formValid = await validateLoginRegister(validations, modalContent);
      setTimeout(() => {
        if (formValid === true) {
          const body = {
            login,
            password,
            imgUrl: '',
            cart: [],
            orders: [],
            liked: [],
            id: numberOfUsers + 1,
          };
          const errorBody = {
            id: numberOfUsers + 1,
            errors: [],
          };
          dispatch(createUserRequest(body));
          apiPostError(errorBody);
          history.push('/settings');
          dispatch(isLogged(true));
          setPending(false);
          dispatch(setModalOpen(false));
        } else {
          setErrors(formValid as FormErrors);
          setPending(false);
        }
      }, 1500);
    }
    if (modalContent === 'login') {
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
          } else {
            setPending(false);
            alert.error('Incorrect credentials, please try again');
          }
        } else {
          setPending(false);
          setErrors(formValid as FormErrors);
        }
      }, 1500);
    }
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
        {modalContent === 'register' && (
          <Input
            value={repeatpassword}
            title="repeat password"
            required
            requiredMark
            forId="repeatpassword"
            setValue={setRepeatPassword}
            error={errors}
            setError={setErrors}
            type="password"
            addData={password}
            addSetData={setRepeatPassword}
            content={modalContent}
          />
        )}
      </div>

      <div className={styles.btnsContainer}>
        <Button loading pending={pending} text={modalContent} type="submit" />
      </div>
    </form>
  );
};

const ModalLoginRegister = React.memo(ModalLoginRegisterUnmemoized);

export default ModalLoginRegister;
