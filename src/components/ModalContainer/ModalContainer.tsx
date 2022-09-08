import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CloseImg from '../../../public/close_icon.svg';
import { ModalProps } from '../../interface/intefaces';
import styles from './style.module.css';

const ModalContainer: React.FC<ModalProps> = ({
  children,
  anchor,
  open,
  crossButton,
  toggleModal,
  backdropClickToggle = true,
  text,
}) => {
  const onBackdropClickHandler = () => {
    backdropClickToggle && toggleModal(false);
  };

  const openingStyle = `modal__content_wrapper_${anchor}`;

  return (
    <SwipeableDrawer
      PaperProps={{
        classes: {
          root: `${styles.modal__content_wrapper} ${styles[openingStyle]} `,
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
        paperAnchorBottom: `${styles.modal__content_wrapper__bottom}`,
      }}
    >
      {crossButton && (
        <div className={styles.modal_button_wrapper}>
          {text && <p className={styles.modal_button_text}>{text && text}</p>}
          <button type="button" className={styles.modal_close_button} onClick={toggleModal(false)}>
            <img src={CloseImg} alt="Close" />
          </button>
        </div>
      )}
      <div className={styles.modal__content}>{children}</div>
    </SwipeableDrawer>
  );
};

export default ModalContainer;
