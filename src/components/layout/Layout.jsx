import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Signup from '../Signup';
import { Dashboard } from '../dashboard';
import { PrivateRoute } from '../../customComponents';
import { Navbar } from './Navbar';
import Box from '@mui/material/Box';
import { isLoggedInSelector } from '../../selectors';
import { NotFound } from './NotFound';

const Layout = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: 'calc(100vh - 10rem)',
          overflowY: 'auto',
        }}
      >
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isLoggedIn}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Signup isLoggedIn={isLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
};

export default Layout;
