import './style.scss';

import React from 'react';

import { Button, TextField, Typography } from '@material-ui/core';

const SearchInput: React.FC = () => {
  return (
    <div className="search">
      <Typography variant="h2">Find your movie</Typography>
      <div className="search-input">
        <TextField
          id="filled-basic"
          defaultValue="What do you want to watch?"
          variant="filled"
          style={{ width: '70%' }}
        />
        <Button variant="contained" color="primary" className="search-button">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchInput;
