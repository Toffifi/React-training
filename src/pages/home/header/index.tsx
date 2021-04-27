import './style.scss';

import React, { useState } from 'react';

import Modal from '@/components/modal';
import MovieForm from '@/components/modal/movieForm';
import { ModalType } from '@/enums/modalType';
import { Button } from '@material-ui/core';

import SearchInput from './search-input';

const Header: React.FC = () => {
  const [modalType, setModalType] = useState<ModalType>(ModalType.null);
  return (
    <div className="header">
      <Button
        variant="outlined"
        color="primary"
        className="add-movie-button"
        onClick={() => setModalType(ModalType.add)}
      >
        + Add Movie
      </Button>
      <SearchInput />
      <Modal modalType={modalType} setModalType={setModalType}>
        <MovieForm setModalType={setModalType} />
      </Modal>
    </div>
  );
};

export default Header;
