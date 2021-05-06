import React, { FC } from 'react';

import ControlPanel from './controlPanel';
import Header from './header';
import MoviesList from './moviesList';

const HomeContainer: FC = () => {
  return (
    <>
      <Header />
      <ControlPanel />
      <MoviesList />
    </>
  );
};
export default HomeContainer;
