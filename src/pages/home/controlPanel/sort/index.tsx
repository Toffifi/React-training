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

interface Props {
  dispatchSort: (value: string) => void;
}

const Sort: React.FC<Props> = ({ dispatchSort }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    })
  );
  const classes = useStyles();

  const [sortValue, setSortValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const value = event.target.value;
    setSortValue(value);
    dispatchSort(value);
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
