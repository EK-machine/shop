import React from 'react';
import styles from './style.module.css';
import { StarRateProps } from '../../interface/intefaces';

const StarRate: React.FC<StarRateProps> = ({ rating }) => (
  <div className={styles.starContainer}>
    {[1, 2, 3, 4, 5].map((star, i) => (
      <svg key={star} width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.31034 0.375L6.00805 5.13533L0.862061 5.89429L4.5862 9.60136L3.70576 14.8315L8.31034 12.3636L12.9149 14.8315L12.0345 9.60136L15.7586 5.89946L10.6126 5.13533L8.31034 0.375Z"
          fill={i < rating ? '#f5d442' : '#F5F5F5'}
        />
      </svg>
    ))}
  </div>
);

export default StarRate;
