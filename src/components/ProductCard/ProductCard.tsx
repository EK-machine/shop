import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, ProductType, UserCartItem, UserLikedItem } from 'Interfaces/intefaces';
import Button from 'Components/Button/Button';
import { setModalOpen, setModalProduct } from 'ReduxSlices/modalContentSlice';
import { setProduct } from 'ReduxSlices/allProductsSlice';
import { setLikeRequest, unsetLikeRequest, addToCartRequest, deleteFromCartRequest } from 'ReduxSlices/userSlice';
import styles from './style.module.css';

const ProductCardUnmemoized: React.FC<ProductType> = ({ title, price, category, image, id, description, rating }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [inCart, setInCart] = useState<boolean>(false);
  const pending = useSelector((state: AppStateType) => state.pending.pending.find((item) => item.id === id))?.pending;
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const user = useSelector((state: AppStateType) => logged && state.user.user);
  const userCart = useSelector((state: AppStateType) => logged && state.user.user.cart);
  const likedProds = useSelector((state: AppStateType) => logged && state.user.user.liked);
  const products = useSelector((state: AppStateType) => state.products.products);
  const modalIsOpen = useSelector((state: AppStateType) => state.modal.isOpen);
  const otherPending =
    useSelector((state: AppStateType) =>
      state.pending.pending.filter((item) => item.id !== id && item.pending === true),
    ).length > 0;

  const dispatch = useDispatch();

  const getSelected = () => {
    const selected = products.find((item) => item.title === title);
    if (selected) {
      dispatch(setProduct(selected));
    }
  };

  const openModal = useCallback(() => {
    getSelected();
    dispatch(setModalOpen(true));
    dispatch(setModalProduct());
  }, [products, dispatch]);

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

  const like = useCallback(() => {
    if (likedProds) {
      if (likedProds.length > 0) {
        const isLiked = likedProds.find((item) => item.title === title && item.liked);
        if (isLiked) {
          const newLiked = likedProds.filter((item) => item.title !== title);
          const payload = { id: user && user.id, liked: newLiked, title };
          dispatch(unsetLikeRequest(payload as { id: number; liked: UserLikedItem[]; title: string }));
          setLiked(false);
        } else {
          const prod = {
            id,
            title,
            price,
            category,
            description,
            image,
            rating,
            liked: !isLiked,
          };
          const newLiked = [...likedProds, prod];
          const payload = { id: user && user.id, liked: newLiked, title };
          dispatch(setLikeRequest(payload as { id: number; liked: UserLikedItem[]; title: string }));
          setLiked(true);
        }
      } else if (likedProds.length === 0) {
        const prod = {
          id,
          title,
          price,
          category,
          description,
          image,
          rating,
          liked: true,
        };
        const payload = { id: user && user.id, liked: [prod], title };
        dispatch(setLikeRequest(payload as { id: number; liked: UserLikedItem[]; title: string }));
        setLiked(true);
      }
    }
  }, [likedProds, id, title, price, category, description, image, rating, user, dispatch]);

  const productIsLiked = (val: string) => {
    if (likedProds) {
      if (likedProds.length > 0) {
        const productLiked = likedProds.find((item) => item.title === val && item.liked);
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

  const addRemove = useCallback(() => {
    if (userCart) {
      if (inCart) {
        const newCart = userCart.filter((item) => item.title !== title);
        const payload = { id: user && user.id, cart: newCart, title, prodId: id };
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
          id,
          title,
          price,
          category,
          description,
          image,
          rating,
          quantity: 1,
        };
        const newCart = userCart.concat(prod);
        const payload = { id: user && user.id, cart: newCart, title, prodId: id };
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
  }, [userCart, dispatch, inCart, title, user, id, price, category, description, image, rating]);

  useLayoutEffect(() => {
    if (title) {
      productInCart(title);
    }
  }, [title, userCart]);

  useEffect(() => {
    if (title) {
      productIsLiked(title);
    }
  }, [title, likedProds]);

  return (
    <div className={styles.productContainer}>
      <div className={styles.titleBtn}>
        <h1 className={styles.productTitle}>{title}</h1>
        {logged && <Button like={like} liked={liked} type="button" text="" />}
      </div>
      <div className={styles.productPriceImg}>
        <img src={image} alt={title} className={styles.productImg} />
        <div>
          <p className={styles.productPrice}>{`price: ${price} $`}</p>
          <p className={styles.productCategory}>{category}</p>
        </div>
      </div>
      <div className={`${styles.btnContainer} ${logged ? '' : styles.btnsCentered}`}>
        {logged ? (
          <>
            <Button
              loading
              text={inCart ? 'remove from cart' : 'add to cart'}
              type="button"
              pending={!modalIsOpen && pending}
              onClick={addRemove}
              disabled={otherPending}
            />
            <Button usual underlined text="more detail" type="button" onClick={openModal} />
          </>
        ) : (
          <Button usual underlined text="more detail" type="button" onClick={openModal} />
        )}
      </div>
    </div>
  );
};

const ProductCard = React.memo(ProductCardUnmemoized);

export default ProductCard;
