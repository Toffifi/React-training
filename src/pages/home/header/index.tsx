import './style.scss';

import React, { useState } from 'react';

import Modal from '@/components/modal';
import MovieForm from '@/components/modal/movieForm';
import { ModalType } from '@/enums/modalType';
import { SearchResultItem } from '@/store/movies/interfaces';
import { Button } from '@material-ui/core';

import SearchInput from './search-input';

interface Props {
  dispatchGetData: (value: string) => void;
  addSnackbar: () => void;
  isAddLoading: boolean;
  dispatchAddItem: (item: SearchResultItem) => void;
}

const Header: React.FC<Props> = ({
  dispatchGetData,
  addSnackbar,
  isAddLoading,
  dispatchAddItem,
}) => {
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
      <SearchInput dispatchGetData={dispatchGetData} />
      {modalType === ModalType.null ? null : (
        <Modal setModalType={setModalType}>
          <MovieForm
            setModalType={setModalType}
            addSnackbar={addSnackbar}
            isAddLoading={isAddLoading}
            dispatchAddItem={dispatchAddItem}
          />
        </Modal>
      )}
    </div>
  );
};

export default Header;
