import './style.scss';

import React, { useEffect } from 'react';

import MovieCard from './movieCard';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoading, getMoviesData } from '@/store/movies/selectors';
import Spinner from '@/components/spinner';
import * as movieActions from '@/store/movies/actions';

const MoviesList: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  const data = useSelector(getMoviesData);

  useEffect(() => {
    dispatch(movieActions.getData());
  }, []);

  return data ? (
    <div className="movies">
      <hr />
      <p className="count">
        <span>{data.totalAmount}</span>
        movies found
      </p>
      <div className="movies-list">
        {data.movieList.map((item) => (
          <MovieCard item={item} key={item.id} />
        ))}
      </div>
      {isLoading ? <Spinner /> : null}
    </div>
  ) : (
    <Spinner />
  );
};

export default MoviesList;
