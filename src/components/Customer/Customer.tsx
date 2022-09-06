import React from 'react';
import { CustomerProps } from '../../interface/intefaces';
import styles from './style.module.css';

const Customer: React.FC<CustomerProps> = ({ img, name, reply }) => (
  <>
    <img className={styles.img} src={img} alt={name} />
    <div>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.reply}>{reply}</p>
    </div>
  </>
);

export default Customer;
