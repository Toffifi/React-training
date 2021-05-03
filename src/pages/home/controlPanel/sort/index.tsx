import './style.scss';

import React from 'react';

import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core';

const Sort: React.FC = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    })
  );
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Sort By</InputLabel>
        <Select>
          <MenuItem value={0}>Release Date</MenuItem>
          <MenuItem value={1}>Name</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;
