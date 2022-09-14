import React from 'react';
import styles from './style.module.css';
import { LikedItemProps } from '../../interfaces/intefaces';
import Heart from '../../../public/likedRed.svg';

const LikedItem: React.FC<LikedItemProps> = ({ image, title }) => (
  <div className={styles.likeItem}>
    <div className={styles.itemTitle}>
      <div className={styles.likeItemImgWrapper}>
        <img className={styles.likeItemImg} src={image} alt={title} />
      </div>
      <p className={styles.likeItemTitle}>{title}</p>
    </div>
    <div className={styles.heartWrapper}>
      <img className={styles.heart} src={Heart} alt="heart" />
    </div>
  </div>
);

export default LikedItem;
