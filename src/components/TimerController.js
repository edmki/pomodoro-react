import styled from '@emotion/styled';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const Container = styled.div`
    position: relative;
`;

const StartButton = styled(Button)`
	height: auto;
	font-size: 1.125em;
	padding: 0.75em 1.75em;
	margin-top: 1em;
`;

const ResetButton = styled(IconButton)`
    position: absolute;
    bottom: 0;
    right: -2.5em;
`;

const buttonStatusLabels = {
    stopped: 'Iniciar',
    started: 'Pausar',
    paused: 'Continuar',
};

function TimerController(props) {
    return (
        <Container>
            <StartButton onClick={props.status === 'started' ? props.onPause : props.onStart } variant="contained" color='tertiary'  disableElevation>
                { buttonStatusLabels[props.status] }
            </StartButton>
            { props.status == 'paused' && (<ResetButton color="tertiary" onClick={props.onReset}>
                <RestartAltIcon fontSize='large'/>
            </ResetButton>)}
        </Container>
    );
}

export default TimerController;