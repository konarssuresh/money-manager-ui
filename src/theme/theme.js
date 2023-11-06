import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#304DAF',
    },
    body: {
      background: '#F5F5F5',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
