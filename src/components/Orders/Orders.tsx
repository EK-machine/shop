import React from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.css';
import OrderItem from '../OrderItem/OrderItem';
import { AppStateType } from '../../interfaces/intefaces';

const Orders: React.FC = () => {
  const orders = useSelector((state: AppStateType) => state.user.orders);
  return (
    <div className={styles.cart}>
      {orders.map((item, i) => (
        <OrderItem key={item.items[i].title.slice(0, i)} dateTill={item.dateTill} items={item.items} />
      ))}
    </div>
  );
};

export default Orders;
