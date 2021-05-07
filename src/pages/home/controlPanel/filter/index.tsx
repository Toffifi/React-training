import './style.scss';

import React from 'react';

import { Genres } from '@/enums/genres';
import { Tab, Tabs } from '@material-ui/core';

interface Props {
  dispatchFilter: (value: string) => void;
}

const Filter: React.FC<Props> = ({ dispatchFilter }) => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent, newValue: string) => {
    setValue(newValue);
    dispatchFilter(newValue);
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
