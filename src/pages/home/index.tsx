import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as movieActions from '@/store/movies/actions';
import {
  getHasNextPage,
  getLoadingState,
  getMoviesData,
  getPageLoadingState,
} from '@/store/movies/selectors';
import { itemOnPage } from '@/utils/constants';

import ControlPanel from './controlPanel';
import Header from './header';
import MoviesList from './moviesList';

const HomeContainer: FC = () => {
  const dispatch = useDispatch();

  const data = useSelector(getMoviesData);
  const isLoading = useSelector(getLoadingState);
  const isPageLoading = useSelector(getPageLoadingState);
  const hasNextPage = useSelector(getHasNextPage);

  const dispatchFilter = (value: string): void => {
    dispatch(movieActions.getDataOnFilterChange(value));
  };

  const dispatchSort = (value: string): void => {
    dispatch(movieActions.getDataOnSortChange(value));
  };

  const dispatchGetData = (value = ''): void => {
    dispatch(movieActions.getData(value));
  };

  const dispatchGetNextPage = (): void => {
    dispatch(movieActions.getNextPage(data.offset + itemOnPage));
  };

  return (
    <>
      <Header dispatchGetData={dispatchGetData} />
      <ControlPanel
        dispatchFilter={dispatchFilter}
        dispatchSort={dispatchSort}
      />
      <MoviesList
        data={data}
        isLoading={isLoading}
        isPageLoading={isPageLoading}
        hasNextPage={hasNextPage}
        dispatchGetNextPage={dispatchGetNextPage}
        dispatchGetData={dispatchGetData}
      />
    </>
  );
};
export default HomeContainer;
