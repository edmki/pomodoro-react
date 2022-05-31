import { createContext } from "react";

const savedSettings = JSON.parse(localStorage.getItem('settings'));

export const defaultSettings = {
	pomodoro: {
		name: 'Pomodoro',
		time: 1500000,
	},
	break: {
		name: 'Pausa',
		time: 300000,
	},
	long_break: {
		name: 'Pausa longa',
		time: 600000,
	},
	long_break_interval: 4,
    alarm: {
        name: 'bell',
        volume: 50,
    },
	...savedSettings,
}

export const SettingsContext = createContext({
	...defaultSettings,
	settingsChange: () => {},
});