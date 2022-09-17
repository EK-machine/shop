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
  backdropClickToggle = true,
}) => {
  const [inCart, setInCart] = useState<boolean>(false);
  const userCart = useSelector((state: AppStateType) => logged && state.user.user.cart);
  const onBackdropClickHandler = () => {
    backdropClickToggle && toggleModal(false);
  };

  const openingStyle = `modalContentWrapper${anchor}`;

  const productInCart = (val: string) => {
    if (userCart && userCart.length > 0) {
      const inside = userCart.find((item) => item.title === val);
      if (inside && Object.keys(inside).length > 0) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
  };

  useEffect(() => {
    if (title) {
      productInCart(title);
    }
  }, [title]);

  return (
    <SwipeableDrawer
      PaperProps={{
        classes: {
          root: `${styles.modalContentWrapper} ${styles[openingStyle]} `,
        },
      }}
      onBackdropClick={onBackdropClickHandler}
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
            <Button usual underlined text="remove from cart" type="button" onClick={() => console.log('removed')} />
          ) : (
            <Button usual text="add to cart" type="button" onClick={() => console.log('added')} />
          )}
        </div>
      )}
    </SwipeableDrawer>
  );
};

export default ModalContentWrapper;
