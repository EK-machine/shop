import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from 'Components/Header/Header';
import ModalContainer from 'Components/ModalContainer/ModalContainer';
import { LayoutProps } from 'Interfaces/intefaces';
import { allProductsRequest } from 'ReduxSlices/allProductsSlice';
import styles from './style.module.css';

const Layout: React.FC<LayoutProps> = ({ children, productCategory }) => {
  const [styling, setStyling] = useState<boolean>(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const layoutStyle = (val: string) => {
    if (val.includes('reviews')) {
      setStyling(true);
    } else {
      setStyling(false);
    }
  };

  useEffect(() => {
    layoutStyle(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(allProductsRequest());
  }, []);

  // useEffect(() => () => localStorage.clear(), []);

  return (
    <div className={styles.mainContainer}>
      <Header productCategory={productCategory} />
      <div className={`${styles.mainContent} ${styling ? styles.mainContentReviews : ''}`}>{children}</div>
      <ModalContainer />
    </div>
  );
};

export default Layout;
