import './style.scss';

import React, { useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import Spinner from '@/components/spinner';
import { SearchData } from '@/interfaces';
import { LinearProgress } from '@material-ui/core';

import MovieCard from './movieCard';

interface Props {
  data: SearchData;
  isLoading: boolean;
  isPageLoading: boolean;
  hasNextPage: boolean;
  dispatchGetNextPage: () => void;
  dispatchGetData: () => void;
}

const MoviesList: React.FC<Props> = ({
  data,
  isLoading,
  isPageLoading,
  hasNextPage,
  dispatchGetNextPage,
  dispatchGetData,
}) => {
  const [sentryRef] = useInfiniteScroll({
    loading: isPageLoading,
    hasNextPage,
    onLoadMore: () => {
      dispatchGetNextPage();
    },
    disabled: false,
    rootMargin: '0px 0px 400px 0px',
  });

  useEffect(() => {
    dispatchGetData();
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
