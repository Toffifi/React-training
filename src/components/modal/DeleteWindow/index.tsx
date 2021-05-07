import './style.scss';

import React, { useEffect, useRef } from 'react';

import Spinner from '@/components/spinner';
import { ModalType } from '@/enums/modalType';
import { Button, Typography } from '@material-ui/core';

interface Props {
  id: number;
  setModalType: (arg: ModalType) => void;
  dispatchDeleteItem: (id: number) => void;
  isDeleteLoading: boolean;
  addSnackbar: () => void;
}
const DeleteWindow: React.FC<Props> = ({
  id,
  setModalType,
  dispatchDeleteItem,
  isDeleteLoading,
  addSnackbar,
}) => {
  const prevIsDeleteLoadingRef = useRef<boolean>();

  useEffect(() => {
    if (!isDeleteLoading && prevIsDeleteLoadingRef.current) {
      setModalType(ModalType.null);
      addSnackbar();
    }
  }, [isDeleteLoading, prevIsDeleteLoadingRef]);

  useEffect(() => {
    prevIsDeleteLoadingRef.current = isDeleteLoading;
  });

  const confirmDelete = (): void => {
    dispatchDeleteItem(id);
  };
  return isDeleteLoading ? (
    <Spinner />
  ) : (
    <div className="delete-window">
      <Typography variant="h2">Delete Movie</Typography>
      <Typography variant="h4">
        Are you sure you want to delete this movie?
      </Typography>

      <Button variant="contained" color="primary" onClick={confirmDelete}>
        Confirm
      </Button>
    </div>
  );
};

export default DeleteWindow;
