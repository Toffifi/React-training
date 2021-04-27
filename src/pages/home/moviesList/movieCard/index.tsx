import './style.scss';

import React from 'react';

import Modal from '@/components/modal';
import DeleteWindow from '@/components/modal/DeleteWindow';
import MovieForm from '@/components/modal/movieForm';
import { ModalType } from '@/enums/modalType';
import { Movie } from '@/interfaces';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#232323',
    position: 'relative',
  },
  media: {
    height: 400,
  },
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
const MovieCard: React.FC<{ item: Movie }> = ({ item }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [hoverActive, setHoverActive] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<ModalType>(ModalType.null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const modalChoice = (): React.ReactNode => {
    switch (modalType) {
      case ModalType.delete:
        return <DeleteWindow id={item.id} />;
      case ModalType.edit:
        return <MovieForm item={item} setModalType={setModalType} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Card
        className={classes.root}
        onMouseEnter={() => setHoverActive(true)}
        onMouseLeave={() => setHoverActive(false)}
      >
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
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.poster}
            title={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.genre}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="year"
            >
              {item.year}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal modalType={modalType} setModalType={setModalType}>
        {modalChoice()}
      </Modal>
    </>
  );
};

export default MovieCard;
