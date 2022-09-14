import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './style.module.css';
import { validateLoginRegister } from '../../helpers/validations';
import endpoints from '../../api/endpoints';
import { AppStateType, FormErrors, ModalRegisterLogin } from '../../interfaces/intefaces';
import { isLogged, isLoading } from '../../redux/slices/commonStateSlice';
import { setModalOpen } from '../../redux/slices/modalContentSlice';

const ModalRegister: React.FC<ModalRegisterLogin> = ({ text }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatpassword, setRepeatPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const modalContent = useSelector((state: AppStateType) => state.modal.content);
  const history = useHistory();
  const dispatch = useDispatch();

  const submitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(isLoading(true));
    const validations = { login, password, repeatpassword };

    const formValid = await validateLoginRegister(validations, modalContent);

    if (formValid === true) {
      const body = {
        login,
        password,
        role: 'user',
        imgUrl: '',
        cart: [],
        orders: [],
        liked: [],
      };
      await fetch(endpoints.getUsers, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      history.push('/products');
      dispatch(isLogged(true));
      dispatch(isLoading(false));
      dispatch(setModalOpen(false));
    } else {
      setErrors(formValid as FormErrors);
      dispatch(isLoading(false));
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
          forId="login"
          setValue={setLogin}
          error={errors}
          setError={setErrors}
          type="text"
          modalContent={modalContent}
        />
        <Input
          value={password}
          title="password"
          required
          forId="password"
          setValue={setPassword}
          error={errors}
          setError={setErrors}
          type="text"
          modalContent={modalContent}
        />
        <Input
          value={repeatpassword}
          title="repeat password"
          required
          forId="repeatpassword"
          setValue={setRepeatPassword}
          error={errors}
          setError={setErrors}
          type="text"
          addData={password}
          addSetData={setRepeatPassword}
          modalContent={modalContent}
        />
      </div>

      <div className={styles.btnsContainer}>
        <Button usual text={modalContent} type="submit" />
      </div>
    </form>
  );
};

export default ModalRegister;
