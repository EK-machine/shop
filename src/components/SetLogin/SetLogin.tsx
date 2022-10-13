import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'Components/Button/Button';
import Input from 'Components/Input/Input';
import { setLoginRequest } from 'ReduxSlices/userSlice';
import { FormErrors, AppStateType } from 'Interfaces/intefaces';
import styles from './style.module.css';

const SetLoginUnmemoized: React.FC = () => {
  const [newLogin, setNewLogin] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const users = useSelector((state: AppStateType) => state.user.users);
  const user = useSelector((state: AppStateType) => state.user.user);
  const pending = useSelector((state: AppStateType) => state.pending.pending.find((item) => item.id === 0))?.pending;
  const dispatch = useDispatch();

  const submitChange = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const exists = !!users.find((item) => item.login === newLogin);
      const same = user.login === newLogin;
      if (newLogin !== '' && !exists && !same) {
        const payload = {
          id: user.id,
          login: newLogin,
          prodId: 0,
        };
        dispatch(setLoginRequest(payload));
        setNewLogin('');
      }
    },
    [users, newLogin, user.login, user.id],
  );

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
        <Button disabled={newLogin === ''} loading pending={pending} text="Save changes" type="submit" />
      </div>
    </form>
  );
};

const SetLogin = React.memo(SetLoginUnmemoized);

export default SetLogin;
