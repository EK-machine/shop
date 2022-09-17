import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import LikedItem from '../LikedItem/LikedItem';
import { AppStateType, ProductType } from '../../interfaces/intefaces';
import MostSlider from '../MostSlider/MostSlider';
import { setProduct } from '../../redux/slices/allProductsSlice';
import { setModalOpen, setModalProduct } from '../../redux/slices/modalContentSlice';

const Liked: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [prodCategs, setProdCategs] = useState<ProductType[][]>([]);
  const [most, setMost] = useState<ProductType[]>([]);
  const products = useSelector((state: AppStateType) => state.products.products);
  const likedProducts = useSelector((state: AppStateType) => state.user.user.liked);
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

  const getSelected = (val: string) => {
    const selected = products.find((item) => item.title === val);
    if (selected) {
      dispatch(setProduct(selected));
    }
  };

  const openModal = () => {
    dispatch(setModalOpen(true));
    dispatch(setModalProduct());
  };

  useEffect(() => {
    setCategs(products);
  }, [products]);

  useEffect(() => {
    getProductsPeCategory();
  }, [categories]);

  useEffect(() => {
    getMostPurchasedArr();
  }, [prodCategs]);

  return (
    <div className={styles.cart}>
      {likedProducts.map((item) => (
        <LikedItem key={item.title} image={item.image} title={item.title} onClick={openModal} addAction={getSelected} />
      ))}
      <MostSlider products={most} getSelected={getSelected} openModal={openModal} />
    </div>
  );
};

export default Liked;
