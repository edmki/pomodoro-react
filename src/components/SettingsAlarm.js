import { useContext, useState } from "react";
import styled from "@emotion/styled";
import { Select, MenuItem, Grid } from "@mui/material";
import Slider from '@mui/material/Slider';
import { Stack } from "@mui/material";
import { SettingsContext } from "../SettingsContext";
import sound from "../sound";

const SongItem = styled(MenuItem)`
    color: #000;
`;

function SettingsAlarm() {
    const settings = useContext(SettingsContext);
    const [soundTid, setSoundTid] = useState(null);

    const handleSongChange = (e) => {
        sound.load(e.target.value);
        sound.play(settings.alarm.volume);
        settings.settingsChange({
            ...settings,
            alarm: {
                ...settings.alarm,
                name: e.target.value,
            }
        });
    }

    const handleVolumeChange = (e, newValue) => {
        sound.load(settings.alarm.name);
        const tid = setTimeout(() => {
            sound.play(newValue);
        }, 500);

        setSoundTid((prevTid) => {
            clearTimeout(prevTid);
            return tid;
        });

        settings.settingsChange({
            ...settings,
            alarm: {
                ...settings.alarm,
                volume: newValue,
            }
        });
    }
    
    return (
        <>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4} sm={6}>Alarme:</Grid>
                <Grid item xs={8} sm={6}>
                    <Select value={settings.alarm.name} onChange={handleSongChange} fullWidth={true} id="filled-basic" variant="filled" sx={{ color: '#000' }} >
                        <SongItem value='beep'>
                            Beep
                        </SongItem>
                        <SongItem value='bell'>
                            Bell
                        </SongItem>
                        <SongItem value='success'>
                            Success
                        </SongItem>
                    </Select>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs={4} sm={6}>Volume:</Grid>
                <Grid item xs={8} sm={6} sx={{ marginTop: '30px' }}>
                    <Stack direction='row' spacing={2} alignItems="center">
                        <div>{settings.alarm.volume}%</div>
                        <Slider aria-label="Volume" value={settings.alarm.volume} onChange={handleVolumeChange} />
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default SettingsAlarm;