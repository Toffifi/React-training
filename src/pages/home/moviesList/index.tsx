import './style.scss';

import React, { useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '@/components/spinner';
import * as movieActions from '@/store/movies/actions';
import {
  getHasNextPage,
  getLoadingState,
  getMoviesData,
  getPageLoadingState,
} from '@/store/movies/selectors';
import { LinearProgress } from '@material-ui/core';

import MovieCard from './movieCard';
import { itemOnPage } from '@/utils/constants';

const MoviesList: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingState);
  const isPageLoading = useSelector(getPageLoadingState);
  const hasNextPage = useSelector(getHasNextPage);

  const data = useSelector(getMoviesData);

  const [sentryRef] = useInfiniteScroll({
    loading: isPageLoading,
    hasNextPage,
    onLoadMore: () => {
      dispatch(movieActions.getNextPage(data.offset + itemOnPage));
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
      {isLoading ? <Spinner /> : null}
    </div>
  ) : (
    <Spinner />
  );
};

export default MoviesList;
