import './style.scss';

import React from 'react';

import mockData from '@/data/mockData';

import MovieCard from './movieCard';

const MoviesList: React.FC = () => {
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
    </div>
  );
};

export default MoviesList;
