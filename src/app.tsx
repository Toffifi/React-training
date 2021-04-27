import Logo from './components/logo';
import React, { FC } from 'react';
import './app.scss';
import { ThemeProvider } from '@material-ui/core';
import myTheme from './theme';
import Home from './pages/home';
import ErrorBoundary from './components/errorBoundary';
import Footer from './components/footer';

const App: FC = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <ErrorBoundary>
        <Logo />
        <Home />
        <Footer />
      </ErrorBoundary>
    </ThemeProvider>
  );
};
export default App;
