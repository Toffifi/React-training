import './style.scss';

import React from 'react';

import Modal from '@/components/modal';
import DeleteWindow from '@/components/modal/DeleteWindow';
import MovieForm from '@/components/modal/movieForm';
import { ModalType } from '@/enums/modalType';
import { Movie } from '@/interfaces';
import { SearchResultItem } from '@/store/movies/interfaces';
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  iconButton: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: '#232323ba' },
    position: 'absolute',
    top: '7px',
    right: '5px',
    zIndex: 1,
    backgroundColor: '#232323',
    color: 'white',
    padding: '7px',
  },
});

interface ActionButtonProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: (arg: null | HTMLElement) => void;
  hoverActive: boolean;
  item: Movie;
  dispatchUpdateItem: (item: SearchResultItem) => void;
  dispatchDeleteItem: (id: number) => void;
  isDeleteLoading: boolean;
  isUpdateLoading: boolean;
  addSnackbar: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  anchorEl,
  setAnchorEl,
  hoverActive,
  item,
  dispatchUpdateItem,
  dispatchDeleteItem,
  isDeleteLoading,
  isUpdateLoading,
  addSnackbar,
}) => {
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const [modalType, setModalType] = React.useState<ModalType>(ModalType.null);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const modalChoice = (): React.ReactNode => {
    switch (modalType) {
      case ModalType.delete:
        return (
          <DeleteWindow
            id={item.id}
            setModalType={setModalType}
            dispatchDeleteItem={dispatchDeleteItem}
            isDeleteLoading={isDeleteLoading}
            addSnackbar={addSnackbar}
          />
        );
      case ModalType.edit:
        return (
          <MovieForm
            item={item}
            setModalType={setModalType}
            dispatchUpdateItem={dispatchUpdateItem}
            isUpdateLoading={isUpdateLoading}
            addSnackbar={addSnackbar}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.iconButton}
        style={hoverActive ? {} : { display: 'none' }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setModalType(ModalType.edit);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setModalType(ModalType.delete);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {modalType === ModalType.null ? null : (
        <Modal setModalType={setModalType}>{modalChoice()}</Modal>
      )}
    </>
  );
};

export default ActionButton;
