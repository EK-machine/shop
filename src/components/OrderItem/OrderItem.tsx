import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './style.module.css';
import { AppStateType, OrderItemProps } from '../../interfaces/intefaces';
import { getDate } from '../../helpers/utils';
import Button from '../Button/Button';
import useOutsideClick from '../../hooks/useOutsideClick';

const OrderItem: React.FC<OrderItemProps> = ({ dateTill, items, id, deleteOrder }) => {
  const [orderString, setOrderString] = useState<string>('');
  const [delivered, setDelivered] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const pending = useSelector((state: AppStateType) => state.pending.pending.find((item) => item.id === 0))?.pending;
  const orderRef = useRef(null);

  const closeOrder = () => {
    setIsOpened(false);
  };

  useOutsideClick(orderRef, closeOrder);

  const openOrder = () => {
    const status = isOpened;
    setIsOpened(!status);
  };

  const stopPropag = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    deleteOrder && deleteOrder(id);
  };

  useEffect(() => {
    const { strDate, deliv } = getDate(dateTill);
    setOrderString(strDate);
    setDelivered(deliv);
  }, [dateTill]);

  return (
    <div
      ref={orderRef}
      role="button"
      tabIndex={0}
      onKeyUp={openOrder}
      onClick={openOrder}
      className={`${styles.orderItem} ${delivered ? styles.orderItemDelivered : ''}`}
    >
      <div className={`${styles.overflowContainer} ${isOpened ? styles.overflowContainerOpened : ''}`}>
        <div className={`${styles.orderStatusWrapper} ${isOpened ? styles.orderStatusWrapperOpened : ''}`}>
          <p className={`${styles.orderStatus} ${isOpened ? styles.orderStatusOpened : ''}`}>
            {delivered ? 'Order is delivered' : `Await delivery till ${orderString}`}
          </p>
          {!delivered && isOpened && (
            <Button loading pending={pending} type="button" text="Cancel order" onClick={stopPropag} />
          )}
        </div>
        <div className={`${styles.ordersItemsContainer} ${isOpened ? styles.ordersItemsContainerOpened : ''}`}>
          {items.map((item) => (
            <div key={item.title} className={`${styles.orderItemLine} ${isOpened ? styles.orderItemLineOpened : ''}`}>
              <div className={styles.orderImgWrapper}>
                <img className={styles.orderImg} src={item.image} alt={item.title} />
              </div>
              <p className={`${styles.orderStr} ${isOpened ? styles.orderStrOpened : ''}`}>{item.title}</p>
              <p className={styles.orderStr}>{item.quantity}</p>
              <p className={styles.orderStr}>{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
