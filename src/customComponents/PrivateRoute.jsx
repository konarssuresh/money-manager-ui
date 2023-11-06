import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
export const PrivateRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  } else {
    return <Fragment>{children}</Fragment>;
  }
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.any,
};
