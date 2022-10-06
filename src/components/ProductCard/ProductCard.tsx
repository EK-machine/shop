import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, ProductType, UserCartItem, UserLikedItem } from '../../interfaces/intefaces';
import styles from './style.module.css';
import Button from '../Button/Button';
import { setModalOpen, setModalProduct } from '../../redux/slices/modalContentSlice';
import { setProduct } from '../../redux/slices/allProductsSlice';
import {
  setLikeRequest,
  unsetLikeRequest,
  addToCartRequest,
  deleteFromCartRequest,
} from '../../redux/slices/userSlice';

const ProductCard: React.FC<ProductType> = ({ title, price, category, image, id, description, rating }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [inCart, setInCart] = useState<boolean>(false);
  const pending = useSelector((state: AppStateType) => state.pending.pending.find((item) => item.id === id))?.pending;
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const user = useSelector((state: AppStateType) => logged && state.user.user);
  const userCart = useSelector((state: AppStateType) => logged && state.user.user.cart);
  const likedProds = useSelector((state: AppStateType) => logged && state.user.user.liked);
  const products = useSelector((state: AppStateType) => state.products.products);
  const dispatch = useDispatch();

  const getSelected = () => {
    const selected = products.find((item) => item.title === title);
    if (selected) {
      dispatch(setProduct(selected));
    }
  };

  const openModal = () => {
    getSelected();
    dispatch(setModalOpen(true));
    dispatch(setModalProduct());
  };

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

  const like = () => {
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
  };

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

  const addRemove = () => {
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
  };

  useEffect(() => {
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
            {inCart ? (
              <Button loading text="remove from cart" type="button" pending={pending} onClick={addRemove} />
            ) : (
              <Button loading text="add to cart" type="button" pending={pending} onClick={addRemove} />
            )}
            <Button usual underlined text="more detail" type="button" onClick={openModal} />
          </>
        ) : (
          <Button usual underlined text="more detail" type="button" onClick={openModal} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
