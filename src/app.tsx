import './app.scss';

import React, { FC } from 'react';

import { ThemeProvider } from '@material-ui/core';

import ErrorBoundary from './components/errorBoundary';
import Footer from './components/footer';
import Logo from './components/logo';
import Home from './pages/home';
import myTheme from './theme';

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
