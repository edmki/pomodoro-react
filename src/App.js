import { useState, useEffect, createContext } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Timer from './components/Timer';
import Settings from './components/Settings'
import { SettingsContext, defaultSettings } from './SettingsContext';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const HeaderContent = styled.div`
	position: relative;
	width: 100%;
	max-width: 500px;
	display: flex;
	justify-content: center;
	margin: auto;
`;

const SettingsButton = styled(IconButton)`
	margin-left: auto;
	@media (min-width: 540px) {
		display: none;
	}
`;

const Tittle = styled.h1`
	text-align: center;
	font-size: 2.5em;
	font-weight: 400;
	margin: 0;
	padding: 40px 0;
	@media (max-width: 540px) {
		display: none;
	}
`;

const Container = styled.div`
	padding: 0 20px;
`;

const TimerWrapper = styled(Box)`
	width: 100%;
    padding-top: 100%;
	border-radius: 50%;
	background-color: ${props => props.background};
	margin: 0 auto;
	position: relative;
	font-size: 0.85em;
	@media (min-width: 540px) {
        width: 500px;
		padding-top: 500px;
		font-size: 1em;
	}
`;

function App() {
	const theme = useTheme();
	const primary = theme.palette.primary.main;

	const settingsChange = (newSettings) => {
		setSettings(newSettings);
	}

	const [settings, setSettings] = useState({
		...defaultSettings,
		settingsChange,
	});

	const [settingsOpen, setSettingsOpen] = useState(false);
	
	const handlerChange = (newSettings) => {
		setSettings(newSettings);
	}

	useEffect(() => {
		localStorage.setItem('settings', JSON.stringify(settings));
	}, [settings]);

	return (
		<div className="App">
			<header className="App-header">
				<HeaderContent>
					<Tittle>POMODORINHO</Tittle>
					<SettingsButton color="tertiary" onClick={() => setSettingsOpen(true)}>
						<SettingsIcon fontSize='large'/>
					</SettingsButton>
				</HeaderContent>
			</header>
			<SettingsContext.Provider value={settings}>
				<Container>
					<TimerWrapper sx={{ boxShadow: 3 }} background={primary}>
						<Timer onSettingsChange={handlerChange} onSettingsOpen={() => setSettingsOpen(true)}/>
					</TimerWrapper>
				</Container>
				<Settings open={settingsOpen} onClose={() => {setSettingsOpen(false)}}/>
			</SettingsContext.Provider>
		</div>
	);
}

export default App;
