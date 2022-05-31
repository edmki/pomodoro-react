import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	typography: {
		fontFamily: [
			'Comfortaa',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','),
		button: {
			textTransform: 'none',
			fontFamily: 'inherit',
			fontWeight: 700,
		},
		allVariants: {
			lineHeight: 1,
		}
	},
	palette: {
		primary: {
			main: '#FF7171',
			contrastText: '#fff',
		},
		secondary: {
			main: '#E45B5B',
			contrastText: '#fff',
		},
		tertiary: {
			main: '#fff',
			contrastText: '#FF7171',
		},
		background: {
			default: '#E45B5B'
		},
		text: {
			primary: '#fff',
		}
	},
	components: {
		MuiDialog: {
			styleOverrides: {
				paper: {
					color: '#000',
				}
			}
		},
	}
});