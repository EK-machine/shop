import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { setPasswordRequest } from '../../redux/slices/userSlice';
import { FormErrors, AppStateType } from '../../interfaces/intefaces';

const SetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [repeatpassword, setRepeatPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const user = useSelector((state: AppStateType) => state.user.user);
  const dispatch = useDispatch();

  const submitChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const same = user.password === password;
    if (password !== '' && repeatpassword !== '' && !same) {
      const payload = {
        id: user.id,
        password,
      };
      dispatch(setPasswordRequest(payload));
      setPassword('');
      setRepeatPassword('');
    }
  };

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
          usual
          text="Save changes"
          type="submit"
        />
      </div>
    </form>
  );
};

export default SetPassword;
