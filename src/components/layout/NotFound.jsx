import { Navigate } from 'react-router-dom';

export const NotFound = () => {
  return <Navigate replace to="/login" />;
};
