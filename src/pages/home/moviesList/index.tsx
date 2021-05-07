import './style.scss';

import React, { useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import Spinner from '@/components/spinner';
import { SearchData } from '@/interfaces';
import { SearchResultItem } from '@/store/movies/interfaces';
import { LinearProgress } from '@material-ui/core';

import MovieCard from './movieCard';

interface Props {
  data: SearchData;
  isLoading: boolean;
  isPageLoading: boolean;
  hasNextPage: boolean;
  dispatchGetNextPage: () => void;
  dispatchGetData: () => void;
  dispatchUpdateItem: (item: SearchResultItem) => void;
  dispatchDeleteItem: (id: number) => void;
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  addSnackbar: () => void;
}

const MoviesList: React.FC<Props> = ({
  data,
  isLoading,
  isPageLoading,
  hasNextPage,
  dispatchGetNextPage,
  dispatchGetData,
  dispatchUpdateItem,
  dispatchDeleteItem,
  isDeleteLoading,
  isUpdateLoading,
  addSnackbar,
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
          <MovieCard
            item={item}
            key={item.id}
            dispatchUpdateItem={dispatchUpdateItem}
            dispatchDeleteItem={dispatchDeleteItem}
            isDeleteLoading={isDeleteLoading}
            isUpdateLoading={isUpdateLoading}
            addSnackbar={addSnackbar}
          />
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
