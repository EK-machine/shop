import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CloseImg from '../../../public/closeIcon.svg';
import { AppStateType, ModalProps } from '../../interfaces/intefaces';
import styles from './style.module.css';
import Button from '../Button/Button';

const ModalContentWrapper: React.FC<ModalProps> = ({
  children,
  anchor,
  open,
  crossButton,
  toggleModal,
  logged,
  modalContent,
  title,
  addRemove,
  pending,
}) => {
  const [inCart, setInCart] = useState<boolean>(false);
  const userCart = useSelector((state: AppStateType) => logged && state.user.user.cart);

  const openingStyle = `modalContentWrapper${anchor}`;

  const productInCart = (val: string) => {
    if (userCart) {
      if (userCart.length > 0) {
        const inside = userCart.find((item) => item.title === val);
        if (inside && Object.keys(inside).length > 0) {
          setInCart(true);
        } else {
          setInCart(false);
        }
      } else if (userCart.length === 0) {
        setInCart(false);
      }
    }
  };

  useEffect(() => {
    if (title) {
      productInCart(title);
    }
  }, [title, userCart]);

  return (
    <SwipeableDrawer
      PaperProps={{
        classes: {
          root: `${styles.modalContentWrapper} ${styles[openingStyle]} `,
        },
      }}
      disableSwipeToOpen
      disableDiscovery
      anchor={anchor}
      onClose={toggleModal(false)}
      onOpen={toggleModal(true)}
      open={open}
      classes={{
        paperAnchorBottom: `${styles.modalContentWrapperbottom}`,
      }}
    >
      {crossButton && (
        <div className={styles.modalButtonWrapper}>
          <button type="button" className={styles.modalCloseButton} onClick={toggleModal(false)}>
            <img src={CloseImg} alt="Close" />
          </button>
        </div>
      )}
      <div className={styles.modalContent}>{children}</div>
      {logged && modalContent === 'product' && (
        <div className={styles.modalBottomWrapper}>
          {inCart ? (
            <Button loading text="remove from cart" pending={pending} type="button" onClick={addRemove} />
          ) : (
            <Button loading text="add to cart" type="button" pending={pending} onClick={addRemove} />
          )}
        </div>
      )}
    </SwipeableDrawer>
  );
};

export default ModalContentWrapper;
