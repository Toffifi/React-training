import './style.scss';

import moment from 'moment';
import React, { useEffect, useRef } from 'react';

import Spinner from '@/components/spinner';
import { Genres } from '@/enums/genres';
import { ModalType } from '@/enums/modalType';
import { Movie } from '@/interfaces';
import { SearchResultItem } from '@/store/movies/interfaces';
import { mapMovieItem } from '@/utils/mapMovieItem';
import MomentUtils from '@date-io/moment';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

interface Props {
  setModalType: (arg: ModalType) => void;
  item?: Movie;
  addSnackbar: () => void;
  isAddLoading?: boolean;
  dispatchAddItem?: (item: SearchResultItem) => void;
  dispatchUpdateItem?: (item: SearchResultItem) => void;
  isUpdateLoading?: boolean;
}

const MovieForm: React.FC<Props> = ({
  setModalType,
  item,
  addSnackbar,
  isAddLoading,
  dispatchAddItem,
  dispatchUpdateItem,
  isUpdateLoading,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<moment.Moment | null>(
    moment()
  );

  const [movieItem, setMovieItem] = React.useState<Movie>({
    name: item ? item.name : '',
    genre: item ? item.genre : '',
    releaseDate: item ? item.releaseDate : selectedDate.format('yyyy/MM/dd'),
    poster: item ? item.poster : '',
    overview: item ? item.overview : '',
    runtime: item ? item.runtime : 0,
  });
  const prevIsAddLoadingRef = useRef<boolean>();
  const prevIsUpdateLoadingRef = useRef<boolean>();

  useEffect(() => {
    if (
      (!isUpdateLoading && prevIsUpdateLoadingRef.current) ||
      (!isAddLoading && prevIsAddLoadingRef.current)
    ) {
      setModalType(ModalType.null);
      addSnackbar();
    }
  }, [
    isUpdateLoading,
    prevIsUpdateLoadingRef,
    isAddLoading,
    prevIsAddLoadingRef,
  ]);

  useEffect(() => {
    prevIsAddLoadingRef.current = isAddLoading;
  });
  useEffect(() => {
    prevIsUpdateLoadingRef.current = isUpdateLoading;
  });

  const handleFormChange = (event, key: string): void => {
    setMovieItem((movie) => ({
      ...movie,
      [key]: event.target.value,
    }));
  };

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
    setMovieItem((movie) => ({
      ...movie,
      releaseDate: date.format('yyyy/MM/dd'),
    }));
  };

  const sendData = (): void => {
    item
      ? dispatchUpdateItem(mapMovieItem(movieItem, item.id))
      : dispatchAddItem(mapMovieItem(movieItem));
  };

  return isAddLoading || isUpdateLoading ? (
    <Spinner />
  ) : (
    <div>
      <Typography variant="h2" style={{ textAlign: 'center' }}>
        {item ? 'Edit Movie' : 'Add Movie'}
      </Typography>
      <form className="modal-form" noValidate>
        {item ? (
          <TextField
            disabled
            label="Movie ID"
            defaultValue={item.id}
            variant="filled"
          />
        ) : null}
        <TextField
          variant="filled"
          label="Title"
          defaultValue={movieItem.name}
          onChange={(event) => handleFormChange(event, 'name')}
        />
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <KeyboardDatePicker
            label="Release Date"
            format="dd/MM/yyyy"
            value={movieItem.releaseDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          variant="filled"
          label="Poster URL"
          defaultValue={movieItem.poster}
          onChange={(event) => handleFormChange(event, 'poster')}
        />
        <FormControl
          variant="filled"
          onChange={(event) => handleFormChange(event, 'genre')}
        >
          <InputLabel>Genre</InputLabel>
          <Select>
            {Object.keys(Genres).map((genre, i) => (
              <MenuItem key={i} value={i}>
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="filled"
          label="Overview"
          defaultValue={movieItem.overview}
          onChange={(event) => handleFormChange(event, 'overview')}
        />
        <TextField
          variant="filled"
          label="Runtime"
          defaultValue={movieItem.runtime}
          onChange={(event) => handleFormChange(event, 'runtime')}
        />
        <div className="form-buttons">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setModalType(ModalType.null)}
          >
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={sendData}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
