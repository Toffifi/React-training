import './style.scss';

import React from 'react';

import mockData from '@/data/mockData';

import MovieCard from './movieCard';
import { useSelector } from 'react-redux';
import { getIsLoading } from '@/store/movies/selectors';
import Spinner from '@/components/spinner';

const MoviesList: React.FC = () => {
  const isLoading = useSelector(getIsLoading);
  return (
    <div className="movies">
      <hr />
      <p className="count">
        <span>{mockData.length}</span>
        movies found
      </p>
      <div className="movies-list">
        {mockData.map((item) => (
          <MovieCard item={item} key={item.id} />
        ))}
      </div>
      {isLoading ? <Spinner /> : null}
    </div>
  );
};

export default MoviesList;
