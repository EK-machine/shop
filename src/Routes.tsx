import { withRouter, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import ErrorBoundary from 'Components/ErrorBoundary/ErrorBoundary';
import { base, cart, reviews, settings, notFound } from 'Data/data';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

const ProductsPage = loadable(
  () => pMinDelay(import(/* webpackChunkName: "products-page" */ 'Components/ProductsPage/ProductsPage'), 0),
  {
    fallback: <div>Loading...</div>,
  },
);

const CartPage = loadable(
  () => pMinDelay(import(/* webpackChunkName: "cart-page" */ 'Components/CartPage/CartPage'), 0),
  {
    fallback: <div>Loading...</div>,
  },
);

const ReviewsPage = loadable(
  () => pMinDelay(import(/* webpackChunkName: "reviews-page" */ 'Components/ReviewsPage/ReviewsPage'), 0),
  {
    fallback: <div>Loading...</div>,
  },
);

const NotFoundPage = loadable(
  () => pMinDelay(import(/* webpackChunkName: "notfound-page" */ 'Components/NotFoundPage/NotFoundPage'), 0),
  {
    fallback: <div>Loading...</div>,
  },
);

const SettingsPage = loadable(
  () => pMinDelay(import(/* webpackChunkName: "settings-page" */ 'Components/SettingsPage/SettingsPage'), 0),
  {
    fallback: <div>Loading...</div>,
  },
);

const Routes = () => (
  <>
    <ErrorBoundary>
      <Switch>
        <Route exact path={base} component={ProductsPage} />
        <Route path={base + reviews} component={ReviewsPage} />
        <ProtectedRoute path={base + cart}>
          <CartPage />
        </ProtectedRoute>
        <ProtectedRoute path={base + settings}>
          <SettingsPage />
        </ProtectedRoute>
        <Route path={notFound} component={NotFoundPage} />
      </Switch>
    </ErrorBoundary>
  </>
);

const AppRoutes = withRouter(Routes);

export default AppRoutes;
