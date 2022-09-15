import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AppStateType } from '../interfaces/intefaces';

const ProtectedRoute: React.FC<RouteProps> = ({ children, location, ...props }) => {
  const logged = useSelector((state: AppStateType) => state.common.logged);
  return (
    <Route
      {...props}
      render={() =>
        logged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location?.pathname },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
