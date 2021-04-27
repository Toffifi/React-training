import {
  ButtonGroup,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React from 'react';
import './style.scss';

const Filters: React.FC = () => {
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
    <div className="filters">
      <div>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="filters button group"
        >
          <Button>All</Button>
          <Button>Documentary</Button>
          <Button>Comedy</Button>
          <Button>Horror</Button>
          <Button>Crime</Button>
        </ButtonGroup>
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel>Sort By</InputLabel>
          <Select>
            <MenuItem value={0}>Release Date</MenuItem>
            <MenuItem value={1}>Name</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Filters;
