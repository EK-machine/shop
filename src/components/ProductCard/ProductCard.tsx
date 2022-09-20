import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType, ProductType, UserLikedItem } from '../../interfaces/intefaces';
import styles from './style.module.css';
import Button from '../Button/Button';
import { setModalOpen, setModalProduct } from '../../redux/slices/modalContentSlice';
import { setProduct } from '../../redux/slices/allProductsSlice';
import { setLikeRequest, unsetLikeRequest } from '../../redux/slices/userSlice';
import { toLike, isliked } from '../../data/data';

const ProductCard: React.FC<ProductType> = ({ title, price, category, image, id, description, rating }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [inCart, setInCart] = useState<boolean>(false);
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
    if (userCart && userCart.length > 0) {
      const inside = userCart.find((item) => item.title === val);
      if (inside && Object.keys(inside).length > 0) {
        setInCart(true);
      } else {
        setInCart(false);
      }
    }
  };

  const like = () => {
    if (likedProds) {
      const isLiked = !!likedProds.find((item) => item.title === title && item.liked);
      if (isLiked) {
        const newLiked = likedProds.filter((item) => item.title !== title);
        const dispatchBody = { id: user && user.id, liked: newLiked };
        dispatch(setLikeRequest(dispatchBody as { id: number; liked: UserLikedItem[] }));
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
        const dispatchBody = { id: user && user.id, liked: newLiked };
        dispatch(unsetLikeRequest(dispatchBody as { id: number; liked: UserLikedItem[] }));
      }
    }
  };

  const productIsLiked = (val: string) => {
    if (likedProds && likedProds.length > 0) {
      const productLiked = likedProds.find((item) => item.title === val && item.liked);
      if (productLiked && Object.keys(productLiked).length > 0) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  };

  useEffect(() => {
    if (title) {
      productInCart(title);
    }
  }, [title]);

  useEffect(() => {
    if (title) {
      productIsLiked(title);
    }
  }, [title, likedProds]);

  return (
    <div className={styles.productContainer}>
      <div className={styles.titleBtn}>
        <h1 className={styles.productTitle}>{title}</h1>
        {logged && (
          <button onClick={like} className={styles.likebtn}>
            <img className={styles.likeImg} src={liked ? isliked : toLike} alt="like" />
          </button>
        )}
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
              <Button usual underlined text="remove from cart" type="button" onClick={() => console.log('removed')} />
            ) : (
              <Button usual text="add to cart" type="button" onClick={() => console.log('added')} />
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
