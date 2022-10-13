import React, { useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CloseImg from 'Images/closeIcon.svg';
import { AppStateType, ModalProps } from 'Interfaces/intefaces';
import Button from 'Components/Button/Button';
import styles from './style.module.css';

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

  useLayoutEffect(() => {
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
          <Button
            loading
            text={inCart ? 'remove from cart' : 'add to cart'}
            pending={pending}
            type="button"
            onClick={addRemove}
          />
        </div>
      )}
    </SwipeableDrawer>
  );
};

export default ModalContentWrapper;
