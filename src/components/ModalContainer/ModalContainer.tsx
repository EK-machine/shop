import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalContentWrapper from '../ModalContentWrapper/ModalContentWrapper';
import ModalLogin from '../ModalLogin/ModalLogin';
import ModalRegister from '../ModalRegister/ModalRegister';
import ModalProduct from '../ModalProduct/ModalProduct';
import useScreenWidth from '../../hooks/useScreenWidth';
import { AppStateType, UserCartItem, UserLikedItem } from '../../interfaces/intefaces';
import { getModalTitle } from '../../helpers/utils';
import { setModalOpen } from '../../redux/slices/modalContentSlice';
import {
  getUsersRequest,
  unsetUsers,
  setLikeRequest,
  unsetLikeRequest,
  addToCartRequest,
  deleteFromCartRequest,
} from '../../redux/slices/userSlice';

const ModalContainer: React.FC = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const [inCart, setInCart] = useState<boolean>(false);
  const modalContent = useSelector((state: AppStateType) => state.modal.content);
  const modalIsOpen = useSelector((state: AppStateType) => state.modal.isOpen);
  const modalProduct = useSelector((state: AppStateType) => state.products.product);
  const user = useSelector((state: AppStateType) => logged && state.user.user);
  const userCart = useSelector((state: AppStateType) => logged && state.user.user.cart);
  const likedProds = useSelector((state: AppStateType) => logged && state.user.user.liked);
  const dispatch = useDispatch();
  const isMobile: boolean = useScreenWidth() < 768;

  const toggleModal = (value: boolean) => () => {
    dispatch(setModalOpen(value));
    if (!value) {
      dispatch(unsetUsers());
    }
  };

  const productIsLiked = () => {
    if (likedProds && likedProds.length > 0) {
      const productLiked = likedProds.find((item) => item.title === modalProduct.title && item.liked);
      if (productLiked && Object.keys(productLiked).length > 0) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  };

  const like = () => {
    if (likedProds) {
      const isLiked = !!likedProds.find((item) => item.title === modalProduct.title && item.liked);
      if (isLiked) {
        const newLiked = likedProds.filter((item) => item.title !== modalProduct.title);
        const payload = { id: user && user.id, liked: newLiked };
        dispatch(setLikeRequest(payload as { id: number; liked: UserLikedItem[] }));
      } else {
        const prod = {
          id: modalProduct.id,
          title: modalProduct.title,
          price: modalProduct.price,
          category: modalProduct.category,
          description: modalProduct.description,
          image: modalProduct.image,
          rating: modalProduct.rating,
          liked: !isLiked,
        };
        const newLiked = [...likedProds, prod];
        const payload = { id: user && user.id, liked: newLiked };
        dispatch(unsetLikeRequest(payload as { id: number; liked: UserLikedItem[] }));
      }
    }
  };

  const productInCart = () => {
    if (userCart) {
      if (userCart.length > 0) {
        const inside = userCart.find((item) => item.title === modalProduct.title);
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

  const addRemove = () => {
    if (userCart) {
      if (inCart) {
        const newCart = userCart.filter((item) => item.title !== modalProduct.title);
        const payload = { id: user && user.id, cart: newCart };
        dispatch(
          deleteFromCartRequest(
            payload as {
              id: number;
              cart: UserCartItem[];
            },
          ),
        );
      } else {
        const prod = {
          id: modalProduct.id,
          title: modalProduct.title,
          price: modalProduct.price,
          category: modalProduct.category,
          description: modalProduct.description,
          image: modalProduct.image,
          rating: modalProduct.rating,
          quantity: 1,
        };
        const newCart = userCart.concat(prod);
        const payload = { id: user && user.id, cart: newCart };
        dispatch(
          addToCartRequest(
            payload as {
              id: number;
              cart: UserCartItem[];
            },
          ),
        );
      }
    }
  };

  useEffect(() => {
    if (!logged && modalIsOpen && (modalContent === 'login' || modalContent === 'register')) {
      dispatch(getUsersRequest());
    }
  }, [logged, modalContent, modalIsOpen]);

  useEffect(() => {
    productInCart();
  }, [modalProduct.title, userCart]);

  useEffect(() => {
    productIsLiked();
  }, [modalProduct.title, likedProds]);

  return (
    <>
      <ModalContentWrapper
        crossButton
        anchor={isMobile ? 'bottom' : 'right'}
        open={modalIsOpen}
        toggleModal={toggleModal}
        logged={logged}
        modalContent={modalContent}
        title={modalProduct.title}
        addRemove={addRemove}
      >
        {modalContent === 'login' && <ModalLogin text={getModalTitle(modalContent)} />}
        {modalContent === 'register' && <ModalRegister text={getModalTitle(modalContent)} />}
        {modalContent === 'product' && (
          <ModalProduct
            logged={logged}
            text={getModalTitle(modalContent)}
            product={modalProduct}
            liked={liked}
            like={like}
          />
        )}
      </ModalContentWrapper>
    </>
  );
};

export default ModalContainer;
