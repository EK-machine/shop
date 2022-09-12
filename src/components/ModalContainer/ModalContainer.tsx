import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalContentWrapper from '../ModalContentWrapper/ModalContentWrapper';
import ModalLogin from '../ModalLogin/ModalLogin';
import ModalRegister from '../ModalRegister/ModalRegister';
import ModalProduct from '../ModalProduct/ModalProduct';
import useScreenWidth from '../../hooks/useScreenWidth';
import { AppStateType } from '../../interface/intefaces';
import { getModalTitle } from '../../helpers/utils';
import { setModalOpen } from '../../redux/slices/modalContentSlice';

const ModalContainer: React.FC = () => {
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const modalContent = useSelector((state: AppStateType) => state.modal.content);
  const modalIsOpen = useSelector((state: AppStateType) => state.modal.isOpen);
  const modalProduct = useSelector((state: AppStateType) => state.products.product);
  const dispatch = useDispatch();
  const isMobile: boolean = useScreenWidth() < 768;
  const toggleModal = (value: boolean) => () => {
    dispatch(setModalOpen(value));
  };

  return (
    <>
      <ModalContentWrapper
        crossButton
        anchor={isMobile ? 'bottom' : 'right'}
        open={modalIsOpen}
        toggleModal={toggleModal}
        logged={logged}
        modalContent={modalContent}
      >
        {modalContent === 'login' && <ModalLogin text={getModalTitle(modalContent)} />}
        {modalContent === 'register' && <ModalRegister text={getModalTitle(modalContent)} />}
        {modalContent === 'product' && <ModalProduct text={getModalTitle(modalContent)} product={modalProduct} />}
      </ModalContentWrapper>
    </>
  );
};

export default ModalContainer;
