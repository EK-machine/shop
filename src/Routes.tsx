import { useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CartPage from './components/CartPage/CartPage';
import ReviewsPage from './components/ReviewsPage/ReviewsPage';
import ProductsPage from './components/ProductsPage/ProductsPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { base, cart, reviews, notFound } from './data/data';
import Header from './components/Header/Header';
import styles from './styles.module.css';
import { apiGetProducts } from './api/apis';
import { setAllProducts } from './redux/slices/allProductsSlice';
import ModalContainer from './components/ModalContainer/ModalContainer';

const Routes = () => {
  const dispatch = useDispatch();

  const getProducts = async () => {
    const prods = await apiGetProducts();
    if (prods) {
      dispatch(setAllProducts(prods));
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Header bottomShadow />
      <Switch>
        <Route exact path={base} component={ProductsPage} />
        <Route exact path={base + cart} component={CartPage} />
        <Route exact path={base + reviews} component={ReviewsPage} />
        <Route path={notFound} component={NotFoundPage} />
      </Switch>
      <ModalContainer />
    </div>
  );
};

const AppRoutes = withRouter(Routes);

export default AppRoutes;
