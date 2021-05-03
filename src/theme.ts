import { createMuiTheme, Theme } from '@material-ui/core';

const myTheme: Theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        backgroundColor: '#232323',
        color: '#555555',
        borderRadius: '4px',
        padding: '12px',
      },
    },
    MuiFilledInput: {
      input: {
        padding: '24px 20px 10px',
        fontSize: '1rem',
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
      body1: {
        color: 'black',
      },
    },
    MuiButton: {
      textPrimary: {
        color: '#afa7a7',
        fontSize: '0.9rem',
      },
    },
    MuiSvgIcon: {
      root: {
        color: '#F65261',
      },
    },
    MuiTab: {
      textColorPrimary: {
        color: 'white',
      },
      root: {
        fontSize: '0.9rem',
        minWidth: 'auto !important',
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
    h4: {
      fontSize: '1rem',
      letterSpacing: '0.06em',
      color: 'white',
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
