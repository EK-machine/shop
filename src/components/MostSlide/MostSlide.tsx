import React from 'react';
import StarRate from 'Components/StarRate/StarRate';
import { MostSlideProps } from 'Interfaces/intefaces';
import styles from './style.module.css';

const MostSlideUnmemoized: React.FC<MostSlideProps> = ({ title, image, rating, onClick, addAction }) => (
  <button
    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick && onClick(event);
      addAction && addAction(title);
    }}
    className={styles.mostSlideContainer}
  >
    <div className={styles.titleRate}>
      <h1 className={styles.mostSlideTitle}>{title}</h1>
      <StarRate rating={rating.rate} />
      <p className={styles.mostSlideRating}>{`${rating.count} happy purchases`}</p>
    </div>
    <div className={styles.mostImgWrapper}>
      <img className={styles.mostSlideImg} src={image} alt={`${title}`} />
    </div>
  </button>
);

const MostSlide = React.memo(MostSlideUnmemoized);

export default MostSlide;
