import React, { FC } from 'react';

import Filters from './filters';
import Header from './header';
import MoviesList from './moviesList';

const Home: FC = () => {
  return (
    <>
      <Header />
      <Filters />
      <MoviesList />
    </>
  );
};
export default Home;
