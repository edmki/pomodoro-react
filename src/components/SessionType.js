import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import { useTheme } from '@mui/material/styles';

const SessionTypeContent = styled.div`
    padding: 0.5em 0.75em;
    font-size: 1.25em;
    background-color: ${props => props.background};
    border-radius: 0.25em;
    margin-bottom: 1.5em;
    position: relative;
`;

const NextButton = styled(IconButton)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -3.125em;
    font-size: 1em;
`;

function SessionType({ title, count, onSkip, showCount }) {
	const theme = useTheme();
	const secondary = theme.palette.secondary.main;

    return (
        <SessionTypeContent background={secondary}>
            {title} {showCount && `#${count}`}
            <NextButton color="tertiary" onClick={onSkip}>
                <SkipNextRoundedIcon fontSize='large' />
            </NextButton>
        </SessionTypeContent>
    );
}

export default SessionType;