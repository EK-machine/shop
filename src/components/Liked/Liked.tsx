import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LikedItem from 'Components/LikedItem/LikedItem';
import { AppStateType, ProductType, UserLikedItem } from 'Interfaces/intefaces';
import MostSlider from 'Components/MostSlider/MostSlider';
import { setProduct } from 'ReduxSlices/allProductsSlice';
import { setModalOpen, setModalProduct } from 'ReduxSlices/modalContentSlice';
import { setLikeRequest, unsetLikeRequest } from 'ReduxSlices/userSlice';
import { setHeading } from 'ReduxSlices/headingSlice';
import styles from './style.module.css';

const Liked: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [prodCategs, setProdCategs] = useState<ProductType[][]>([]);
  const [most, setMost] = useState<ProductType[]>([]);
  const logged = useSelector((state: AppStateType) => state.common.logged);
  const user = useSelector((state: AppStateType) => logged && state.user.user);
  const products = useSelector((state: AppStateType) => state.products.products);
  const likedProds = useSelector((state: AppStateType) => logged && state.user.user.liked);
  const dispatch = useDispatch();

  const setCategs = (data: ProductType[]) => {
    const all = Array.from(new Set(data.map((cat) => cat.category)));
    setCategories(all);
  };

  const getProductsPeCategory = () => {
    const arr: ProductType[][] = [];
    categories.forEach((categ) => {
      const items = products.filter((item) => item.category === categ);
      arr.push(items);
    });
    setProdCategs(arr);
  };

  const mostPurchased = (arr: ProductType[]) => {
    const mostPurchasedProduct = arr.reduce((more, less) => (more.rating.count >= less.rating.count ? more : less));
    return mostPurchasedProduct;
  };

  const getMostPurchasedArr = () => {
    const productsArr: ProductType[] = [];
    prodCategs.forEach((item) => {
      const result = mostPurchased(item);
      productsArr.push(result);
    });
    setMost(productsArr);
  };

  const getSelected = useCallback(
    (val: string) => {
      const selected = products.find((item) => item.title === val);
      if (selected) {
        dispatch(setProduct(selected));
      }
    },
    [products, dispatch],
  );

  const getProductData = (val: string) => {
    const product = products.find((item) => item.title === val);
    return product;
  };

  const like = useCallback(
    (val: string) => {
      if (likedProds) {
        if (likedProds.length > 0) {
          const isLiked = likedProds.find((item) => item.title === val && item.liked);
          if (isLiked) {
            const newLiked = likedProds.filter((item) => item.title !== val);
            const dispatchBody = { id: user && user.id, liked: newLiked, title: val };
            dispatch(unsetLikeRequest(dispatchBody as { id: number; liked: UserLikedItem[]; title: string }));
          } else {
            const product = getProductData(val);
            const prod = {
              id: product?.id,
              title: product?.title,
              price: product?.price,
              category: product?.category,
              description: product?.description,
              image: product?.image,
              rating: product?.rating,
              liked: true,
            };
            const newLiked = [...likedProds, prod];
            const dispatchBody = { id: user && user.id, liked: newLiked, title: val };
            dispatch(setLikeRequest(dispatchBody as { id: number; liked: UserLikedItem[]; title: string }));
          }
        } else if (likedProds.length === 0) {
          const product = getProductData(val);
          const prod = {
            id: product?.id,
            title: product?.title,
            price: product?.price,
            category: product?.category,
            description: product?.description,
            image: product?.image,
            rating: product?.rating,
            liked: true,
          };
          const dispatchBody = { id: user && user.id, liked: [prod], title: val };
          dispatch(setLikeRequest(dispatchBody as { id: number; liked: UserLikedItem[]; title: string }));
        }
      }
    },
    [likedProds, user, dispatch, products],
  );

  const openModal = useCallback(() => {
    dispatch(setModalOpen(true));
    dispatch(setModalProduct());
  }, [dispatch]);

  useEffect(() => {
    setCategs(products);
  }, [products]);

  useEffect(() => {
    getProductsPeCategory();
  }, [categories]);

  useEffect(() => {
    getMostPurchasedArr();
  }, [prodCategs]);

  useEffect(() => {
    if (likedProds && likedProds.length === 0) {
      dispatch(setHeading('You have no liked products'));
    } else {
      dispatch(setHeading('Products You Like'));
    }
  }, [likedProds]);

  return (
    <div className={styles.liked}>
      {likedProds && likedProds.length === 0 ? (
        <MostSlider products={most} getSelected={getSelected} openModal={openModal} />
      ) : (
        <div className={styles.likedShadow}>
          {likedProds &&
            likedProds.map((item) => (
              <LikedItem
                key={item.title}
                image={item.image}
                title={item.title}
                onClick={openModal}
                addAction={getSelected}
                like={like}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Liked;
