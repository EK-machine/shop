import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../interfaces/intefaces';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './style.module.css';
import { newAva, change } from '../../data/data';

const SetAvatar: React.FC = () => {
  const [newImg, setNewImg] = useState<string>('');
  const [initNewImg, setInitNewImg] = useState<string>('');
  const avatar = useSelector((state: AppStateType) => state.user.imgUrl);

  const submitChange = () => {
    console.log('saved');
  };

  useEffect(() => {
    setInitNewImg(newAva);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgs}>
        <img className={styles.img} src={avatar} alt="user avatar" />
        <img className={styles.imgChange} src={change} alt="change" />
        <img className={styles.img} src={newImg === '' ? initNewImg : newImg} alt="new avatar" />
      </div>
      <form className={styles.form} onSubmit={submitChange}>
        <Input
          value={newImg}
          title="New avatar"
          required
          forId="avatar"
          setValue={setNewImg}
          type="text"
          placeholder="paste url..."
          content="login"
        />
        <div className={styles.btnsContainer}>
          <Button usual text="Save changes" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SetAvatar;
