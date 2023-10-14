import React, { useState } from 'react';
import { apiRequest } from '../api/api_request';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DateField } from '@mui/x-date-pickers/DateField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { SET_PARAMS } from '../store/slice';
import { mmLogin } from '../api/mm_login';
import { useNavigate } from 'react-router';

 
function Request() {
    const paramsset = useSelector(state => state.data.requestedFromApi)
    const token = useSelector(state => state.data.token)
    const loginStatus = useSelector(state => state.data.loggedIn)
    const [Latitude, setLatitude] = useState("");
    const [Longitude, setLongitude] = useState("");
    const [inputDate, setInputDate] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleRequest = () => {
        if (!Latitude || !Longitude || !inputDate) {
            console.log('Please enter coordinates')
        } else {
            let params =  {
                Latitude: Latitude,
                Longitude: Longitude,
                inputDate: inputDate,
            }
            dispatch(SET_PARAMS(params))
            mmLogin(token).then(result => { apiRequest(result, params) });
            navigate('/result')
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box
                component="form"
                sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                noValidate
                autoComplete="off"
                >
                    <Stack spacing={2} direction="column">
                    <p>Example: <br /> Latitude: 48.8588897 <br /> Longitude: 2.320041</p>
                    <TextField label="Input date"
                    onChange={(e) => setInputDate(e.target.value)}
                    />
                        {/* <DatePicker
                            value={inputDate}
                            onChange={(e) => setInputDate(value)} 
                            label="Insert date"
                        /> */}
                        <TextField id="outlined-basic" label="Latitude" variant="outlined" onChange={(e) => setLatitude(e.target.value)} />
                        <TextField id="outlined-basic" label="Longitude" variant="outlined" onChange={(e) => setLongitude(e.target.value)} />
                    {loginStatus && (
                        <Stack spacing={2} direction="column">
                            <FormControlLabel
                                value="wind_speed_10m:ms"
                                control={<Checkbox />}
                                label="Wind speed, m/s"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="wind_dir_10m:d"
                                control={<Checkbox />}
                                label="Wind direction, deg."
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="t_2m:C"
                                control={<Checkbox />}
                                label="Temperature, C"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="msl_pressure:hPa"
                                control={<Checkbox />}
                                label="Mean pressure, hPa"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="sunrise:sql"
                                control={<Checkbox />}
                                label="Sunrise"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="sunset:sql"
                                control={<Checkbox />}
                                label="Sunset"
                                labelPlacement="end"
                            />  
                        </Stack>
                        )}
                        <Button variant="contained" onClick={handleRequest}>Send request</Button>
                    </Stack>
            </Box>
        </LocalizationProvider>
   );
};

export default Request