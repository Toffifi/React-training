import './style.scss';

import React, { useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '@/components/spinner';
import { LoadingType } from '@/enums/loadingType';
import * as movieActions from '@/store/movies/actions';
import {
  getHasNextPage,
  getIsLoading,
  getMoviesData,
} from '@/store/movies/selectors';
import { LinearProgress } from '@material-ui/core';

import MovieCard from './movieCard';

const MoviesList: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const hasNextPage = useSelector(getHasNextPage);

  const data = useSelector(getMoviesData);

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading === LoadingType.page,
    hasNextPage,
    onLoadMore: () => {
      dispatch(movieActions.getData(data.offset + 12, false));
    },
    disabled: false,
    rootMargin: '0px 0px 400px 0px',
  });

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
      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <LinearProgress color="secondary" />
        </div>
      )}
      {isLoading === LoadingType.initial ? <Spinner /> : null}
    </div>
  ) : (
    <Spinner />
  );
};

export default MoviesList;
