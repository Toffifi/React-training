import './style.scss';

import React from 'react';

import { Button, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as movieActions from '@/store/movies/actions';

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const search = (title: string): void => {
    dispatch(movieActions.search(title));
  };
  return (
    <div className="search">
      <Typography variant="h2">Find your movie</Typography>
      <div className="search-input">
        <TextField
          id="filled-basic"
          label="What do you want to watch?"
          variant="filled"
          style={{ width: '70%' }}
        />
        <Button
          variant="contained"
          color="primary"
          className="search-button"
          onClick={() => search('Harry Potter')}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
