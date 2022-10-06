import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import OrderItem from '../OrderItem/OrderItem';
import { AppStateType, UserOrder } from '../../interfaces/intefaces';
import { sortByDate } from '../../helpers/utils';
import { deleteOrderRequest } from '../../redux/slices/userSlice';
import { setHeading } from '../../redux/slices/headingSlice';

const Orders: React.FC = () => {
  const [orderedOrders, setOrderedOrders] = useState<UserOrder[]>([]);
  const orders = useSelector((state: AppStateType) => state.user.user.orders);
  const user = useSelector((state: AppStateType) => state.user.user);
  const dispatch = useDispatch();

  const sortOrders = async () => {
    const newOrder = await sortByDate(orders);
    if (newOrder) {
      setOrderedOrders(newOrder);
    }
  };

  const deleteOrder = (id: number) => {
    const newOrders = orders.filter((item) => item.id !== id);
    const payload = { id: user && user.id, orders: newOrders, prodId: 0 };
    dispatch(deleteOrderRequest(payload));
  };

  useEffect(() => {
    sortOrders();
  }, [orders]);

  useEffect(() => {
    if (orders && orders.length === 0) {
      dispatch(setHeading('You have no orders'));
    } else {
      dispatch(setHeading('Your Orders'));
    }
  }, [orders]);

  return (
    <div className={styles.orders}>
      {orders && orders.length === 0 ? (
        <div className={styles.noOrders}>
          <p className={styles.noText}>
            Check out our{' '}
            <Link className={styles.noTextLink} to="/">
              products
            </Link>{' '}
            to make an order
          </p>
        </div>
      ) : (
        <>
          {orderedOrders &&
            orderedOrders.map((item, i) => (
              <OrderItem
                key={item.dateTill.slice(0, i)}
                deleteOrder={deleteOrder}
                dateTill={item.dateTill}
                id={item.id}
                items={item.items}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default Orders;
