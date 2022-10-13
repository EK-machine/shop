import { withRouter, Route, Switch } from 'react-router-dom';
import CartPage from 'Components/CartPage/CartPage';
import ReviewsPage from 'Components/ReviewsPage/ReviewsPage';
import ProductsPage from 'Components/ProductsPage/ProductsPage';
import NotFoundPage from 'Components/NotFoundPage/NotFoundPage';
import SettingsPage from 'Components/SettingsPage/SettingsPage';
import ErrorBoundary from 'Components/ErrorBoundary/ErrorBoundary';
import { base, cart, reviews, settings, notFound } from 'Data/data';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

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
