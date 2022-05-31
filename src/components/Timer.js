import { useState, useEffect, useContext } from "react";
import * as workerTimers from 'worker-timers';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import TimerController from './TimerController';
import SessionType from './SessionType';
import Clock from './Clock';
import { SettingsContext } from "../SettingsContext";
import sound from '../sound';

const TimerContent = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SettingsButton = styled(IconButton)`
	position: absolute;
	font-size: 1em;
	top: 3.75em;
	right: 6.25em;
	@media (max-width: 540px) {
		display: none;
	}
`;

function Timer(props) {
	const settings = useContext(SettingsContext);

	const [currentTime, setCurrentTime] = useState(settings.pomodoro.time);
	const [timerId, setTimerId] = useState(null);
	const [currentTimerType, setCurrentTimerType] = useState('pomodoro');
	const [timerStatus, setTimerStatus] = useState('stopped');
	const [pomodoroCount, setPomodoroCount] = useState(1);

	useEffect(() => {
		setCurrentTime(settings[currentTimerType].time);
	}, [settings]);

	useEffect(() => {
		if (timerId !== null && currentTime <= 0) {
			onTimerEnd();
		}
	}, [currentTime]);

	const nextTimer = () => {
		let newTimerType;
		resetTimer();
		if (currentTimerType === 'pomodoro') {
			document.title = 'Hora da pausa!';
			newTimerType = pomodoroCount % settings.long_break_interval === 0 ? 'long_break' : 'break';
			setPomodoroCount(prevState => { return prevState + 1 });
		} else {
			newTimerType = 'pomodoro';
			document.title = 'Hora de focar!';
		}

		setCurrentTime(settings[newTimerType].time);
		setCurrentTimerType(newTimerType);
	}

	const startTimer = () => {
		if (currentTime > 0) {
			timer();
			setTimerStatus('started');
		}
	}

	const timer = (timeout = 1000) => {
		const startTime = new Date().getTime()

		let id = workerTimers.setTimeout(() => {
			let fix = new Date().getTime() - startTime - 1000;

			setCurrentTime((prevState) => {
				const newTime = prevState - 1000;
				document.title = `${getFortmattedTime(newTime)} - ${settings[currentTimerType].name}`;
				return newTime;
			});

			timer(timeout - fix);
		}, timeout);
		setTimerId(id);
	}

	const pauseTimer = () => {
		clearTimer();
		setTimerStatus('paused');
	}

	const resetTimer = () => {
		clearTimer();
		setCurrentTime(settings[currentTimerType].time);
		document.title = 'Pomodorinho';
		setTimerStatus('stopped');
	}

	const clearTimer = () => {
		if (timerId === null) return;
		workerTimers.clearTimeout(timerId);
		setTimerId(null);
	}

	const onTimerEnd = () => {
		playSound();
		nextTimer();
	}

	const getFortmattedTime = (time) => {
		const seconds = Math.floor(time / 1000);
		return Math.floor(seconds / 60).toString().padStart(2, '0') + ":" + (seconds % 60).toString().padStart(2, '0');
	}

	const changeCurrentTimer = (time) => {
		settings.settingsChange({
			...settings,
			[currentTimerType]: {
				...settings[currentTimerType],
				time: settings[currentTimerType].time + time,
			}
		});
	}

	const playSound = () => {
		sound.play(settings.alarm.name, settings.alarm.volume);
	}

	return (
		<TimerContent>
			<SettingsButton color="tertiary" onClick={props.onSettingsOpen}>
				<SettingsIcon fontSize='large' />
			</SettingsButton>
			<SessionType title={settings[currentTimerType].name} count={pomodoroCount} onSkip={nextTimer} showCount={currentTimerType === 'pomodoro'} />
			<Clock time={currentTime} onChangeTime={changeCurrentTimer} />
			<TimerController onPause={pauseTimer} onStart={startTimer} onReset={resetTimer} status={timerStatus} />
		</TimerContent>
	);
}

export default Timer;