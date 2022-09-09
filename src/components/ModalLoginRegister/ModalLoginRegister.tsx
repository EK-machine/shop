import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './style.module.css';
import { validateLoginRegister } from '../../helpers/validations';
import endpoints from '../../api/endpoints';
import { FormErrors, ModalLoginRegisterProps } from '../../interface/intefaces';

const ModalLoginRegister: React.FC<ModalLoginRegisterProps> = ({ modalContent }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatpassword, setRepeatPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const history = useHistory();

  const submitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validations =
      modalContent === 'register'
        ? {
            login,
            password,
            repeatpassword,
          }
        : {
            login,
            password,
          };

    const formValid = await validateLoginRegister(validations, modalContent);

    if (modalContent === 'register') {
      if (formValid === true) {
        const body = {
          login,
          password,
          role: 'user',
        };
        await fetch(endpoints.getUsers, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        history.push('/products');
        window.location.reload();
      } else {
        setErrors(formValid as FormErrors);
      }
    }
    if (modalContent === 'log in') {
      if (formValid === true) {
        const users = await fetch(endpoints.getUsers)
          .then((all) => all.json())
          .then((registered) =>
            registered.find(
              (user: { login: string; password: string }) => user.login === login && user.password === password,
            ),
          );
        if (Object.keys(users).length > 0) {
          history.push('/cart');
          window.location.reload();
        }
      } else {
        setErrors(formValid as FormErrors);
      }
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={submitRegister}>
      {modalContent === 'register' && (
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
      )}
      {modalContent === 'log in' && (
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
        </div>
      )}
      <div className={styles.btnsContainer}>
        <Button usual text={modalContent} type="submit" />
      </div>
    </form>
  );
};

export default ModalLoginRegister;
