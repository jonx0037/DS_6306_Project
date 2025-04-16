import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#354CA1', // SMU Blue per brand guidelines
      light: '#5a6db8',
      dark: '#253571',
    },
    secondary: {
      main: '#C8102E', // SMU Red
      light: '#d13f56',
      dark: '#8c0b20',
    },
    background: {
      default: '#FFFFFF',
      paper: '#f5f5f5', // Light Gray from brand palette
    },
    text: {
      primary: '#333333', // Dark Gray from brand palette
      secondary: '#666666',
    },
    // Add accent color from SMU palette
    info: {
      main: '#5ab4ac', // Accent color for visualizations
    },
  },
  typography: {
    // Use Arial as accessible alternative to Trade Gothic per SMU guidelines
    fontFamily: '"Arial", "Helvetica", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#354CA1', // SMU Blue for headers
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#354CA1', // SMU Blue for headers
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          '&.Mui-selected': {
            color: '#354CA1',
          },
        },
      },
    },
  },
});