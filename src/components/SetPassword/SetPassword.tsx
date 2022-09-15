import React, { useState } from 'react';
import styles from './style.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { FormErrors } from '../../interfaces/intefaces';

const SetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [repeatpassword, setRepeatPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});

  const submitChange = () => {
    console.log('saved');
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
        type="text"
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
        type="text"
        addData={password}
        addSetData={setRepeatPassword}
        content="register"
      />
      <div className={styles.btnsContainer}>
        <Button usual text="Save changes" type="submit" />
      </div>
    </form>
  );
};

export default SetPassword;
