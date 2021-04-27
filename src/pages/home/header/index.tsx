import { Button } from '@material-ui/core';
import React from 'react';
import SearchInput from './search-input';
import './style.scss';

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
