import './style.scss';

import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import * as movieActions from '@/store/movies/actions';
import { Button, TextField, Typography } from '@material-ui/core';

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);

  const search = (): void => {
    dispatch(movieActions.setKeyword(searchInput.current.value));
    dispatch(movieActions.getData());
  };

  const checkKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.code === 'Enter') {
      event.preventDefault();
      search();
    }
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
          inputRef={searchInput}
          onKeyDown={(event) => checkKeyDown(event)}
        />
        <Button
          variant="contained"
          color="primary"
          className="search-button"
          onClick={search}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
