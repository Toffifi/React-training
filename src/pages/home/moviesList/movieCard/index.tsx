import './style.scss';

import React from 'react';

import { Movie } from '@/interfaces';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';

import ActionButton from './actionButton';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#232323',
    position: 'relative',
  },
  media: {
    height: 400,
  },
});

const defaultImg = 'https://media.comicbook.com/files/img/default-movie.png';
const MovieCard: React.FC<{ item: Movie }> = ({ item }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [hoverActive, setHoverActive] = React.useState<boolean>(false);

  return (
    <>
      <Card
        className={classes.root}
        onMouseEnter={() => setHoverActive(true)}
        onMouseLeave={() => {
          setAnchorEl(null);
          setHoverActive(false);
        }}
      >
        <ActionButton
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          hoverActive={hoverActive}
          item={item}
        />
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.poster}
            title={item.name}
            component="img"
            onError={(error) => {
              error.target.src = defaultImg;
            }}
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
    </>
  );
};

export default MovieCard;
