import { TextField } from "@mui/material";
import styled from "@emotion/styled";
import Divider from '@mui/material/Divider';
import { Grid } from "@mui/material";
import { SettingsContext } from "../SettingsContext";
import { useContext } from "react";

const Input = styled(TextField)`
    & input {
        color: #000;
    }
`;

function SettingsTimer() {
    const settings = useContext(SettingsContext);

    const handlePomodoroChange = (e) => {
        settings.settingsChange({
            ...settings,
            pomodoro: {
                ...settings.pomodoro,
                time: e.target.value * 60000
            }
        });
    }

    const handleBreakChange = (e) => {
        settings.settingsChange({
            ...settings,
            break: {
                ...settings.break,
                time: e.target.value * 60000
            }
        });
    }

    const handleLongBreakChange = (e) => {
        settings.settingsChange({
            ...settings,
            long_break: {
                ...settings.long_break,
                time: e.target.value * 60000
            }
        });
    }

    const handleLongBreakintervalChange = (e) => {
        settings.settingsChange({
            ...settings,
            long_break_interval: e.target.value,
        });
    }
    
    const toMinutes = (time) => {
        return Math.floor(time / 60000);
    }
    
    return (
        <>
            <p>Duração:</p>
            <Grid container spacing={2} sx={{ marginBottom: '30px' }}>
                <Grid item xs={4}>
                    <Input onChange={handlePomodoroChange} type='number' fullWidth={true} inputProps={{ min: 0 }} defaultValue={toMinutes(settings.pomodoro.time)} id="filled-basic" label="Pomodoro" variant="filled" helperText="minutos" />
                </Grid>
                <Grid item xs={4}>
                    <Input onChange={handleBreakChange} type='number' fullWidth={true} inputProps={{ min: 0 }} defaultValue={toMinutes(settings.break.time)} id="filled-basic" label="Pausa curta" variant="filled" helperText="minutos" />
                </Grid>
                <Grid item xs={4}>
                    <Input onChange={handleLongBreakChange} type='number' fullWidth={true} inputProps={{ min: 0 }} defaultValue={toMinutes(settings.long_break.time)} id="filled-basic" label="Pausa longa" variant="filled" helperText="minutos" />
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2} sx={{ alignItems: 'center', marginTop: '30px' }}>
                <Grid item xs={8}>Intervalo de pausa longa:</Grid>
                <Grid item xs={4}>
                    <Input onChange={handleLongBreakintervalChange} type='number' inputProps={{ min: 0 }} defaultValue={settings.long_break_interval} fullWidth={true} id="filled-basic" variant="filled" helperText="pomodoros" />
                </Grid>
            </Grid>

        </>
    );
}

export default SettingsTimer;