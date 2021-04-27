import { createMuiTheme, Theme } from '@material-ui/core';

const myTheme: Theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        backgroundColor: '#232323',
        color: '#555555',
        borderRadius: '4px',
      },
    },
    MuiFilledInput: {
      input: {
        padding: '15px',
        fontSize: '1.2rem',
      },
    },
    MuiSelect: {
      icon: {
        color: '#F65261',
      },
    },
    MuiInputLabel: {
      formControl: {
        color: '#555555',
        backgroundColor: '#232323',
        zIndex: 1,
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: '#afa7a7',
      },
    },
    MuiButton: {
      textPrimary: {
        color: '#afa7a7;',
      },
    },
    MuiIconButton: {
      root: {
        position: 'absolute',
        top: '7px',
        right: '5px',
        zIndex: 1,
        backgroundColor: '#232323',
        color: 'white',
        padding: '7px',
      },
    },
  },
  palette: {
    primary: {
      main: '#F65261',
    },
  },
  typography: {
    h2: {
      fontWeight: 100,
      color: 'white',
      fontSize: '2.3rem',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
    h5: {
      fontSize: '1rem',
      letterSpacing: '0.06em',
      color: '#afa7a7',
    },
    body2: {},
    button: {
      fontSize: '1rem',
    },
  },
});
export default myTheme;
