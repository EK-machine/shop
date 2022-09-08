import React from 'react';
import { CustomerProps } from '../../interface/intefaces';
import styles from './style.module.css';

const Reviw: React.FC<CustomerProps> = ({ img, name, reply }) => (
  <div className={styles.container}>
    <img className={styles.img} src={img} alt={name} />
    <div className={styles.data}>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.reply}>{`"${reply}"`}</p>
    </div>
  </div>
);

export default Reviw;
