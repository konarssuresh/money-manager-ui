import Layout from './components/layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { GlobalModalComponent } from './customComponents';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout />
      <GlobalModalComponent />
    </ThemeProvider>
  );
}

export default App;
