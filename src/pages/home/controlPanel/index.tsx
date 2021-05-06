import './style.scss';

import React from 'react';

import Filter from './filter';
import Sort from './sort';

const ControlPanel: React.FC = () => {
  return (
    <div className="control-panel">
      <Filter />
      <Sort />
    </div>
  );
};

export default ControlPanel;
