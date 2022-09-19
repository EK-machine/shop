import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { setLoginRequest } from '../../redux/slices/userSlice';
import { FormErrors, AppStateType } from '../../interfaces/intefaces';

const SetLogin: React.FC = () => {
  const [newLogin, setNewLogin] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const users = useSelector((state: AppStateType) => state.user.users);
  const user = useSelector((state: AppStateType) => state.user.user);
  const dispatch = useDispatch();

  const submitChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exists = !!users.find((item) => item.login === newLogin);
    const same = user.login === newLogin;
    if (newLogin !== '' && !exists && !same) {
      const payload = {
        id: user.id,
        login: newLogin,
      };
      dispatch(setLoginRequest(payload));
      setNewLogin('');
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={submitChange}>
      <Input
        value={newLogin}
        title="New login"
        required
        forId="login"
        setValue={setNewLogin}
        error={errors}
        setError={setErrors}
        type="text"
        content="login"
      />
      <div className={styles.btnsContainer}>
        <Button disabled={newLogin === ''} usual text="Save changes" type="submit" />
      </div>
    </form>
  );
};

export default SetLogin;
