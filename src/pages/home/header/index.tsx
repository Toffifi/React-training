import './style.scss';

import React from 'react';

import { Button } from '@material-ui/core';

import SearchInput from './search-input';

const Header: React.FC = () => {
  return (
    <div className="header">
      <Button variant="outlined" color="primary" className="add-movie-button">
        + Add Movie
      </Button>
      <SearchInput />
    </div>
  );
};

export default Header;
