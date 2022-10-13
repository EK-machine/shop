import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalContentWrapper from 'Components/ModalContentWrapper/ModalContentWrapper';
import ModalLoginRegister from 'Components/ModalLoginRegister/ModalLoginRegister';
import ModalProduct from 'Components/ModalProduct/ModalProduct';
import useScreenWidth from 'Hooks/useScreenWidth';
import { AppStateType, UserCartItem, UserLikedItem } from 'Interfaces/intefaces';
import { getModalTitle } from 'Helpers/utils';
import { setModalOpen } from 'ReduxSlices/modalContentSlice';
import {
  getUsersRequest,
  unsetUsers,
  setLikeRequest,
  unsetLikeRequest,
  addToCartRequest,
  deleteFromCartRequest,
} from 'ReduxSlices/userSlice';

const ModalContainer: React.FC = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const [inCart, setInCart] = useState<boolean>(false);
  const modalContent = useSelector((state: AppStateType) => state.modal.content);
  const modalIsOpen = useSelector((state: AppStateType) => state.modal.isOpen);
  const modalProduct = useSelector((state: AppStateType) => state.products.product);
  const pending = useSelector((state: AppStateType) =>
    state.pending.pending.find((item) => item.id === modalProduct.id),
  )?.pending;
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
    if (likedProds) {
      if (likedProds.length > 0) {
        const productLiked = likedProds.find((item) => item.title === modalProduct.title && item.liked);
        if (productLiked && Object.keys(productLiked).length > 0) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } else if (likedProds.length === 0) {
        setLiked(false);
      }
    }
  };

  const like = useCallback(() => {
    if (likedProds) {
      if (likedProds.length > 0) {
        const isLiked = likedProds.find((item) => item.title === modalProduct.title && item.liked);
        if (isLiked) {
          const newLiked = likedProds.filter((item) => item.title !== modalProduct.title);
          const payload = { id: user && user.id, liked: newLiked, title: modalProduct.title };
          dispatch(unsetLikeRequest(payload as { id: number; liked: UserLikedItem[]; title: string }));
        } else {
          const prod = {
            id: modalProduct.id,
            title: modalProduct.title,
            price: modalProduct.price,
            category: modalProduct.category,
            description: modalProduct.description,
            image: modalProduct.image,
            rating: modalProduct.rating,
            liked: true,
          };
          const newLiked = [...likedProds, prod];
          const payload = { id: user && user.id, liked: newLiked, title: modalProduct.title };
          dispatch(setLikeRequest(payload as { id: number; liked: UserLikedItem[]; title: string }));
        }
      } else if (likedProds.length === 0) {
        const prod = {
          id: modalProduct.id,
          title: modalProduct.title,
          price: modalProduct.price,
          category: modalProduct.category,
          description: modalProduct.description,
          image: modalProduct.image,
          rating: modalProduct.rating,
          liked: true,
        };
        const payload = { id: user && user.id, liked: [prod], title: modalProduct.title };
        dispatch(setLikeRequest(payload as { id: number; liked: UserLikedItem[]; title: string }));
      }
    }
  }, [
    likedProds,
    modalProduct.title,
    user,
    modalProduct.id,
    modalProduct.price,
    modalProduct.category,
    modalProduct.description,
    modalProduct.image,
    modalProduct.rating,
  ]);

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

  const addRemove = useCallback(() => {
    if (userCart) {
      if (inCart) {
        const newCart = userCart.filter((item) => item.title !== modalProduct.title);
        const payload = { id: user && user.id, cart: newCart, title: modalProduct.title, prodId: modalProduct.id };
        dispatch(
          deleteFromCartRequest(
            payload as {
              id: number;
              cart: UserCartItem[];
              title: string;
              prodId: number;
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
        const payload = { id: user && user.id, cart: newCart, title: modalProduct.title, prodId: modalProduct.id };
        dispatch(
          addToCartRequest(
            payload as {
              id: number;
              cart: UserCartItem[];
              title: string;
              prodId: number;
            },
          ),
        );
      }
    }
  }, [
    userCart,
    inCart,
    user && user.id,
    modalProduct.id,
    modalProduct.title,
    modalProduct.price,
    modalProduct.category,
    modalProduct.description,
    modalProduct.image,
    modalProduct.rating,
  ]);

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
        pending={pending}
      >
        {(modalContent === 'register' || modalContent === 'login') && (
          <ModalLoginRegister text={getModalTitle(modalContent)} />
        )}
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
