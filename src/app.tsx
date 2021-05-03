import './app.scss';

import React, { FC } from 'react';

import { ThemeProvider } from '@material-ui/core';

import ErrorBoundary from './components/errorBoundary';
import Footer from './components/footer';
import Logo from './components/logo';
import HomeContainer from './pages/home';
import myTheme from './theme';

const App: FC = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <ErrorBoundary>
        <Logo />
        <HomeContainer />
        <Footer />
      </ErrorBoundary>
    </ThemeProvider>
  );
};
export default App;
