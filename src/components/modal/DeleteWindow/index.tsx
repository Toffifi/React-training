import './style.scss';

import React from 'react';

import { Button, Typography } from '@material-ui/core';

const DeleteWindow: React.FC<{
  id: number;
}> = ({ id }) => {
  return (
    <div className="delete-window">
      <Typography variant="h2">Delete Movie</Typography>
      <Typography variant="h4">
        Are you sure you want to delete this movie?
      </Typography>

      <Button type="submit" variant="contained" color="primary">
        Confirm
      </Button>
    </div>
  );
};

export default DeleteWindow;
