import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import styles from './style.module.css';
import { apiGetProducts } from '../../api/apis';
import { setAllProducts } from '../../redux/slices/allProductsSlice';
import ModalContainer from '../ModalContainer/ModalContainer';
import { LayoutProps } from '../../interfaces/intefaces';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [styling, setStyling] = useState<boolean>(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const getProducts = async () => {
    const prods = await apiGetProducts();
    if (prods) {
      dispatch(setAllProducts(prods));
    }
  };

  const layoutStyle = (val: string) => {
    if (val.includes('reviews')) {
      setStyling(true);
    } else {
      setStyling(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    layoutStyle(location.pathname);
  }, [location.pathname]);

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={`${styles.mainContent} ${styling ? styles.mainContentReviews : ''}`}>{children}</div>
      <ModalContainer />
    </div>
  );
};

export default Layout;
