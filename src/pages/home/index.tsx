import { useSnackbar } from 'notistack';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as movieActions from '@/store/movies/actions';
import { SearchResultItem } from '@/store/movies/interfaces';
import * as movieSelectors from '@/store/movies/selectors';
import { itemOnPage } from '@/utils/constants';

import ControlPanel from './controlPanel';
import Header from './header';
import MoviesList from './moviesList';

const HomeContainer: FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const data = useSelector(movieSelectors.getMoviesData);
  const isLoading = useSelector(movieSelectors.getLoadingState);
  const isPageLoading = useSelector(movieSelectors.getPageLoadingState);
  const hasNextPage = useSelector(movieSelectors.getHasNextPage);

  const isDeleteLoading = useSelector(movieSelectors.getDeleteLoadingState);
  const isDeleteStatus = useSelector(movieSelectors.getDeleteStatusState);

  const isAddLoading = useSelector(movieSelectors.getAddLoadingState);
  const isAddStatus = useSelector(movieSelectors.getAddStatusState);

  const isUpdateLoading = useSelector(movieSelectors.getUpdateLoadingState);
  const isUpdateStatus = useSelector(movieSelectors.getUpdateStatusState);

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

  const dispatchAddItem = (item: SearchResultItem): void => {
    dispatch(movieActions.addItem(item));
  };

  const dispatchUpdateItem = (item: SearchResultItem): void => {
    dispatch(movieActions.updateItem(item));
  };

  const dispatchDeleteItem = (id: number): void => {
    dispatch(movieActions.deleteItem(id));
  };

  const addSnackbar = (): void => {
    if (isDeleteStatus) {
      enqueueSnackbar('Item was successful delete', { variant: 'success' });
    } else if (isAddStatus) {
      enqueueSnackbar('Item was successful add', { variant: 'success' });
    } else if (isUpdateStatus) {
      enqueueSnackbar('Item was successful update', { variant: 'success' });
    } else {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <>
      <Header
        dispatchGetData={dispatchGetData}
        addSnackbar={addSnackbar}
        isAddLoading={isAddLoading}
        dispatchAddItem={dispatchAddItem}
      />
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
        dispatchUpdateItem={dispatchUpdateItem}
        dispatchDeleteItem={dispatchDeleteItem}
        isDeleteLoading={isDeleteLoading}
        isUpdateLoading={isUpdateLoading}
        addSnackbar={addSnackbar}
      />
    </>
  );
};
export default HomeContainer;
