import './style.scss';

import React from 'react';

import Filter from './filter';
import Sort from './sort';

interface Props {
  dispatchFilter: (value: string) => void;
  dispatchSort: (value: string) => void;
}

const ControlPanel: React.FC<Props> = ({ dispatchFilter, dispatchSort }) => {
  return (
    <div className="control-panel">
      <Filter dispatchFilter={dispatchFilter} />
      <Sort dispatchSort={dispatchSort} />
    </div>
  );
};

export default ControlPanel;
