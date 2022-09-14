import React from 'react';
import styles from './style.module.css';
import { LikedItemProps } from '../../interfaces/intefaces';
import Heart from '../../../public/likedRed.svg';

const LikedItem: React.FC<LikedItemProps> = ({ image, title, onClick, addAction }) => (
  <button
    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick && onClick(event);
      addAction && addAction(title);
    }}
    className={styles.likeItem}
  >
    <div className={styles.itemTitle}>
      <div className={styles.likeItemImgWrapper}>
        <img className={styles.likeItemImg} src={image} alt={title} />
      </div>
      <p className={styles.likeItemTitle}>{title}</p>
    </div>
    <div
      role="button"
      tabIndex={0}
      onKeyUp={(event: React.KeyboardEvent<HTMLDivElement>) => {
        event.stopPropagation();
        console.log('unliked!');
      }}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        console.log('unliked!');
      }}
      className={styles.heartWrapper}
    >
      <img className={styles.heart} src={Heart} alt="heart" />
    </div>
  </button>
);

export default LikedItem;
