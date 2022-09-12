import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CloseImg from '../../../public/close_icon.svg';
import { ModalProps } from '../../interface/intefaces';
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
  backdropClickToggle = true,
}) => {
  const onBackdropClickHandler = () => {
    backdropClickToggle && toggleModal(false);
  };

  const openingStyle = `modalContentWrapper${anchor}`;

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
      {!logged && modalContent === 'product' && (
        <div className={styles.modalBottomWrapper}>
          <Button usual underlined text="remove from cart" type="button" onClick={() => console.log('removed')} />
          <Button usual text="add to cart" type="button" onClick={() => console.log('added')} />
        </div>
      )}
    </SwipeableDrawer>
  );
};

export default ModalContentWrapper;
