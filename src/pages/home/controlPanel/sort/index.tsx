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
import { useDispatch } from 'react-redux';
import * as movieActions from '@/store/movies/actions';

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

  const dispatch = useDispatch();

  const [sortValue, setSortValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const value = event.target.value;
    setSortValue(value);
    dispatch(movieActions.setSort(value));
    dispatch(movieActions.getData());
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortValue} onChange={handleChange}>
          <MenuItem value={''}>Default</MenuItem>
          <MenuItem value={'release_date'}>Release Date</MenuItem>
          <MenuItem value={'title'}>Name</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Sort;
