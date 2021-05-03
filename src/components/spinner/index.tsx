import './style.scss';

import React from 'react';

import { CircularProgress } from '@material-ui/core';

const Spinner: React.FC = () => {
  return (
    <div className="spinner-bg">
      <CircularProgress size="200px" color="primary" />
    </div>
  );
};

export default Spinner;
