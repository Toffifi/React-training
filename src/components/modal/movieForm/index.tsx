import './style.scss';

import moment from 'moment';
import React from 'react';

import { ModalType } from '@/enums/modalType';
import { Movie } from '@/interfaces';
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

const MovieForm: React.FC<{
  setModalType: (arg: ModalType) => void;
  item?: Movie;
}> = ({ setModalType, item }) => {
  const [selectedDate, setSelectedDate] = React.useState<moment.Moment | null>(
    moment()
  );

  const handleDateChange = (date: moment.Moment | null) => {
    setSelectedDate(date);
  };
  return (
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
        <TextField variant="filled" label="Title" />
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <KeyboardDatePicker
            label="Release Date"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField variant="filled" label="Movie URL" />
        <FormControl variant="filled">
          <InputLabel>Genre</InputLabel>
          <Select>
            <MenuItem value={0}>Documentary</MenuItem>
            <MenuItem value={1}>Comedy</MenuItem>
            <MenuItem value={2}>Horror</MenuItem>
            <MenuItem value={3}>Crime</MenuItem>
          </Select>
        </FormControl>
        <TextField variant="filled" label="Overview" />
        <TextField variant="filled" label="Runtime" />
        <div className="form-buttons">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setModalType(ModalType.null)}
          >
            Reset
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
