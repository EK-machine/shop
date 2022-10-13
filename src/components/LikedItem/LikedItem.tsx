import React from 'react';
import { LikedItemProps } from 'Interfaces/intefaces';
import Heart from 'Images/likedRed.svg';
import styles from './style.module.css';

const LikedItemUnmemoized: React.FC<LikedItemProps> = ({ image, title, onClick, addAction, like }) => (
  <button
    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick && onClick(event);
      addAction && addAction(title);
    }}
    className={styles.likeItem}
    tabIndex={0}
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
        like && like(title);
      }}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        like && like(title);
      }}
      className={styles.heartWrapper}
    >
      <img className={styles.heart} src={Heart} alt="heart" />
    </div>
  </button>
);

const LikedItem = React.memo(LikedItemUnmemoized);

export default LikedItem;
