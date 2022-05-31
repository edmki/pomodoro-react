import { useState } from "react";
import styled from "@emotion/styled";
import IconButton from '@mui/material/IconButton';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';

const TimeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 8em;
`;

const Number = styled.div`
    position: relative;
`;

const ButtonUp = styled(IconButton)`
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
`;

const ButtonDown = styled(IconButton)`
    position: absolute;
    bottom: -22px;
    left: 50%;
    transform: translateX(-50%);
`;

function Clock({ time, onChangeTime }) {
    const totalSeconds = Math.floor(time / 1000)
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    const add = (time, num) => {
        if (parseInt(num) === 9)
            onChangeTime(time * -9);
        else 
            onChangeTime(time);
    }

    const subtract = (time, num) => {
        if (parseInt(num) === 0)
            onChangeTime(time * -9)
        else
            onChangeTime(time)
    }

    return (
        <TimeWrapper>
            {[].map.call(minutes, (num, index) => {
                const place = minutes.length - index - 1;
                return (
                    <Minute key={index} num={num} onAdd={() => {add(Math.pow(10, place) * 60000, num)}} onSubtract={() => {subtract(Math.pow(10, place) * 60000 * -1, num)}} />
                );
            })}:<div>{seconds}</div>
        </TimeWrapper>
    );
}

function Minute({ num, onAdd, onSubtract }) {
    const [mouseOver, setMouseOver] = useState(false);
    return (
        <Number onMouseOver={() => { setMouseOver(true) }} onMouseOut={() => { setMouseOver(false) }}>
            {mouseOver && (<ButtonUp onClick={onAdd} color="tertiary">
                <ArrowDropUpRoundedIcon sx={{ fontSize: '48px' }} />
            </ButtonUp>)}
            {num}
            {mouseOver && (<ButtonDown onClick={onSubtract} color="tertiary">
                <ArrowDropDownRoundedIcon sx={{ fontSize: '48px' }} />
            </ButtonDown>)}
        </Number>
    );
}

export default Clock;