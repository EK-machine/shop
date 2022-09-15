import { withRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import CartPage from './components/CartPage/CartPage';
import ReviewsPage from './components/ReviewsPage/ReviewsPage';
import ProductsPage from './components/ProductsPage/ProductsPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import MoreReviewsPage from './components/MoreReviewsPage/MoreReviewsPage';
import { base, cart, reviews, settings, notFound, reviewsmore } from './data/data';

const Routes = () => (
  <>
    <Switch>
      <Route exact path={base} component={ProductsPage} />
      <Route path={base + reviews} component={ReviewsPage} />
      <Route path={base + reviewsmore} component={MoreReviewsPage} />
      <ProtectedRoute path={base + cart}>
        <CartPage />
      </ProtectedRoute>
      <ProtectedRoute path={base + settings}>
        <SettingsPage />
      </ProtectedRoute>
      <Route path={notFound} component={NotFoundPage} />
    </Switch>
  </>
);

const AppRoutes = withRouter(Routes);

export default AppRoutes;
