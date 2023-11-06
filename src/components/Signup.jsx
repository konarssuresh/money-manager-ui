import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useForm, useController } from 'react-hook-form';
import { REGEX, ERROR_MESSAGE } from '../constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { actions } from '../ducks';
import { isLoggedInSelector } from '../selectors';

import { useLoginOrSignupMutation } from '../apis';

const StyledCard = styled(Card)(() => ({}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  cursor: 'pointer',
});

const { authActions } = actions;

export const Signup = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [loginOrSignup, loginSignupResult] = useLoginOrSignupMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    control,
    reset,
    trigger,
    formState: { errors = {} },
    getValues,
  } = useForm({
    mode: 'onBlur',
    defaultValues: { userId: '', password: '' },
  });

  const {
    field: useridField,
    fieldState: { invalid, error },
  } = useController({
    name: 'userId',
    control,
    rules: {
      required: ERROR_MESSAGE.REQUIRED,
      pattern: { value: REGEX.EMAIL, message: ERROR_MESSAGE.EMAIL },
    },
  });

  const {
    field: passwordField,
    fieldState: { invalid: passwordInvalid, error: passwordError },
  } = useController({
    name: 'password',
    control,
    rules: {
      required: ERROR_MESSAGE.REQUIRED,
      pattern: { value: REGEX.PASSWORD, message: ERROR_MESSAGE.PASSWORD },
    },
  });

  useEffect(() => {
    isLoggedIn && navigate('/dashboard');
  }, [isLoggedIn, navigate]);

  const isLogin = location.pathname.toLowerCase().includes('login');

  const handleSubmit = async () => {
    setErrorMessage('');
    await trigger();
    if (isEmpty(errors)) {
      const result = await loginOrSignup({ ...getValues(), isLogin });
      if ('error' in result) {
        result.error?.response?.data &&
          setErrorMessage(result.error?.response?.data);
      } else {
        if (isLogin) {
          dispatch(
            authActions.setLoginData({
              authToken: result.data.token,
              refreshToken: result.data['refresh_token'],
              userId: getValues('userId'),
            })
          );
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      }
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        marginTop: { xs: '3.5rem', sm: '10rem' },
      }}
    >
      <Container maxWidth="sm">
        <StyledCard
          sx={{
            padding: { xs: '2rem 1rem', sm: '2rem' },
          }}
          raised
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h4" textAlign="center">
                  {isLogin ? 'Login' : 'Sign Up'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="User Id"
                  {...useridField}
                  placeholder="Enter user id"
                  error={invalid}
                  helperText={error?.message}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  {...passwordField}
                  placeholder="Enter password"
                  error={passwordInvalid}
                  helperText={passwordError?.message}
                  variant="outlined"
                  fullWidth
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loginSignupResult.loading}
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={handleReset}>
                  Reset
                </Button>
              </Grid>
              {!isEmpty(errorMessage) && (
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    sx={{ color: 'red' }}
                  >
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="subtitle2" textAlign="center">
                  {isLogin ? 'Dont have an account?' : 'Already signed up?'}
                  <StyledLink
                    sx={{
                      paddingLeft: 0.5,
                    }}
                    variant="body1"
                    color="primary.main"
                    onClick={() => {
                      reset();
                      setErrorMessage('');
                      if (isLogin) {
                        navigate('/signup', { replace: true });
                      } else {
                        navigate('/login', { replace: true });
                      }
                    }}
                  >
                    {isLogin ? 'Sign up' : 'Login'}
                  </StyledLink>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default Signup;
