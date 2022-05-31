import { useState } from "react";
import PropTypes from 'prop-types';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from '@mui/material/DialogContent';
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab";
import Box from '@mui/material/Box';
import SettingsTimer from "./SettingsTimer";
import SettingsAlarm from "./SettingsAlarm";
import { Button, DialogActions, useMediaQuery, useTheme } from "@mui/material";

function Settings(props) {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <Dialog open={props.open} onClose={props.onClose} fullScreen={fullScreen} fullWidth={true} maxWidth='lg' >
            <DialogTitle>Preferências</DialogTitle>
            <DialogContent>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label='Cronômetro' {...a11yProps(0)} />
                    <Tab label='Alarme' {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <SettingsTimer/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <SettingsAlarm/>
                </TabPanel>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && 
                (<Box sx={{ marginTop: '30px' }}>{children}</Box>)
            }
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


export default Settings;