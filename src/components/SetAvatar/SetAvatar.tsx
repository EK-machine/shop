import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../interfaces/intefaces';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './style.module.css';
import { newAva, change } from '../../data/data';
import { setAvatarRequest } from '../../redux/slices/userSlice';

const SetAvatarUnmemoized: React.FC = () => {
  const [newImg, setNewImg] = useState<string>('');
  const [initNewImg, setInitNewImg] = useState<string>('');
  const avatar = useSelector((state: AppStateType) => state.user.user.imgUrl);
  const userId = useSelector((state: AppStateType) => state.user.user.id);
  const pending = useSelector((state: AppStateType) => state.pending.pending.find((item) => item.id === 0))?.pending;
  const dispatch = useDispatch();

  const submitChange = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (newImg !== '' && userId) {
        const payload = {
          id: userId,
          imgUrl: newImg,
          prodId: 0,
        };
        dispatch(setAvatarRequest(payload));
        setNewImg('');
      }
    },
    [newImg, userId],
  );

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
          <Button disabled={newImg === ''} loading pending={pending} text="Save changes" type="submit" />
        </div>
      </form>
    </div>
  );
};

const SetAvatar = React.memo(SetAvatarUnmemoized);

export default SetAvatar;
