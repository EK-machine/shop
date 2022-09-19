import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../interfaces/intefaces';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './style.module.css';
import { newAva, change } from '../../data/data';
import { setAvatarRequest } from '../../redux/slices/userSlice';

const SetAvatar: React.FC = () => {
  const [newImg, setNewImg] = useState<string>('');
  const [initNewImg, setInitNewImg] = useState<string>('');
  const avatar = useSelector((state: AppStateType) => state.user.user.imgUrl);
  const userId = useSelector((state: AppStateType) => state.user.user.id);
  const dispatch = useDispatch();

  const submitChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newImg !== '' && userId) {
      const payload = {
        id: userId,
        imgUrl: newImg,
      };
      dispatch(setAvatarRequest(payload));
    }
  };

  useEffect(() => {
    setInitNewImg(newAva);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgs}>
        {avatar !== '' ? (
          <img className={styles.img} src={avatar} alt="user avatar" />
        ) : (
          <p className={styles.setAvatar}>Set avatar</p>
        )}

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
          <Button disabled={newImg === ''} usual text="Save changes" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SetAvatar;
