import './style.scss';

import React from 'react';
import { useDispatch } from 'react-redux';

import { Genres } from '@/enums/genres';
import * as movieActions from '@/store/movies/actions';
import { Tab, Tabs } from '@material-ui/core';

const Filter: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent, newValue: string) => {
    setValue(newValue);
    dispatch(movieActions.setFilter(newValue));
    dispatch(movieActions.getData());
  };

  return (
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      aria-label="disabled tabs example"
    >
      <Tab label="all" value="" />
      {Object.keys(Genres).map((genre, i) => (
        <Tab key={i} value={genre} label={genre} />
      ))}
    </Tabs>
  );
};

export default Filter;
