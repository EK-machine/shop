import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'Components/Button/Button';
import Input from 'Components/Input/Input';
import { setPasswordRequest } from 'ReduxSlices/userSlice';
import { FormErrors, AppStateType } from 'Interfaces/intefaces';
import styles from './style.module.css';

const SetPasswordUnmemoized: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [repeatpassword, setRepeatPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const user = useSelector((state: AppStateType) => state.user.user);
  const pending = useSelector((state: AppStateType) => state.pending.pending.find((item) => item.id === 0))?.pending;
  const dispatch = useDispatch();

  const submitChange = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const same = user.password === password;
      if (password !== '' && repeatpassword !== '' && !same) {
        const payload = {
          id: user.id,
          password,
          prodId: 0,
        };
        dispatch(setPasswordRequest(payload));
        setPassword('');
        setRepeatPassword('');
      }
    },
    [user.password, password, repeatpassword, user.id],
  );

  return (
    <form className={styles.wrapper} onSubmit={submitChange}>
      <Input
        value={password}
        title="New password"
        required
        forId="password"
        setValue={setPassword}
        error={errors}
        setError={setErrors}
        type="password"
        content="register"
      />
      <Input
        value={repeatpassword}
        title="Repeat new password"
        required
        forId="repeatpassword"
        setValue={setRepeatPassword}
        error={errors}
        setError={setErrors}
        type="password"
        addData={password}
        addSetData={setRepeatPassword}
        content="register"
      />
      <div className={styles.btnsContainer}>
        <Button
          disabled={password === '' || repeatpassword === '' || !(password === repeatpassword)}
          loading
          pending={pending}
          text="Save changes"
          type="submit"
        />
      </div>
    </form>
  );
};

const SetPassword = React.memo(SetPasswordUnmemoized);

export default SetPassword;
