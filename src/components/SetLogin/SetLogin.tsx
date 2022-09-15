import React, { useState } from 'react';
import styles from './style.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { FormErrors } from '../../interfaces/intefaces';

const SetLogin: React.FC = () => {
  const [newLogin, setNewLogin] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});

  const submitChange = () => {
    console.log('saved');
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
        <Button usual text="Save changes" type="submit" />
      </div>
    </form>
  );
};

export default SetLogin;
