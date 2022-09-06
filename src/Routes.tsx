import { withRouter, Route, Switch } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import HomePage from './components/HomePage/HomePage';
import CartPage from './components/CartPage/CartPage';
import ReviewsPage from './components/ReviewsPage/ReviewsPage';
import ProductsPage from './components/ProductsPage/ProductsPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { base, home, cart, reviews, products, notFound } from './data/data';
import Header from './components/Header/Header';

const Routes = () => (
  <>
    <Header logged />
    <Switch>
      <Route exact path={base} component={WelcomePage} />
      <Route exact path={base + home} component={HomePage} />
      <Route exact path={base + cart} component={CartPage} />
      <Route exact path={base + reviews} component={ReviewsPage} />
      <Route exact path={base + products} component={ProductsPage} />
      <Route path={notFound} component={NotFoundPage} />
    </Switch>
  </>
);

const AppRoutes = withRouter(Routes);

export default AppRoutes;
