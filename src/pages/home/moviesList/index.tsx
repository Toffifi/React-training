import './style.scss';

import React from 'react';

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
import { Movie } from '@/interfaces';
import mockData from '@/data/mockData';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#232323',
    position: 'relative',
  },
  media: {
    height: 400,
  },
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: '#232323ba' },
  },
});
const MoviesList: React.FC = () => {
  // const mockData: Movie[] = [
  //   {
  //     id: '0',
  //     name: 'Pulp Fiction',
  //     genre: 'Action & Adventure',
  //     year: '1994',
  //     poster:
  //       'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
  //   },
  //   {
  //     id: '1',
  //     name: 'Kill Bill: Volume 2',
  //     genre: 'Action & Adventure',
  //     year: '2004',
  //     poster:
  //       'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Kill_Bill_Volume_2.png/220px-Kill_Bill_Volume_2.png',
  //   },
  //   {
  //     id: '2',
  //     name: 'Django Unchained',
  //     genre: 'Action & Adventure',
  //     year: '2012',
  //     poster:
  //       'https://upload.wikimedia.org/wikipedia/en/8/8b/Django_Unchained_Poster.jpg',
  //   },
  //   {
  //     id: '3',
  //     name: 'The Hateful Eight',
  //     genre: 'Action & Adventure',
  //     year: '2015',
  //     poster:
  //       'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/The_Hateful_Eight.jpg/220px-The_Hateful_Eight.jpg',
  //   },
  //   {
  //     id: '4',
  //     name: 'Once Upon a Time in Hollywood',
  //     genre: 'Action & Adventure',
  //     year: '2015',
  //     poster:
  //       'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Once_Upon_a_Time_in_Hollywood_poster.png/220px-Once_Upon_a_Time_in_Hollywood_poster.png',
  //   },
  //   {
  //     id: '5',
  //     name: 'Inglourious Basterds',
  //     genre: 'Action & Adventure',
  //     year: '2009',
  //     poster:
  //       'https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg',
  //   },
  //   {
  //     id: '6',
  //     name: 'Kill Bill: Volume 1',
  //     genre: 'Action & Adventure',
  //     year: '2003',
  //     poster:
  //       'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Kill_Bill_Volume_1.png/220px-Kill_Bill_Volume_1.png',
  //   },
  // ];
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div className="movies">
      <hr />
      <p className="count">
        <span>{mockData.length}</span>
        movies found
      </p>
      <div className="movies-list">
        {mockData.map((item) => (
          <Card className={classes.root} key={item.id}>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.customHoverFocus}
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
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Delete</MenuItem>
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
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
