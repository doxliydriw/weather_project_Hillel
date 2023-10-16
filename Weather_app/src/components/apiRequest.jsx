import React, { useState } from 'react';
import { apiRequest } from '../api/apiRequest';
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
import { useFormik } from 'formik';
import * as yup from 'yup';

import { SET_API_RESULT, SET_PARAMS } from '../store/slice';
import { mmLogin } from '../api/mm_login';
import { useNavigate } from 'react-router';

 
function Request() {
    const paramsset = useSelector(state => state.data.requestedFromApi)
    const token = useSelector(state => state.data.token)
    const loginStatus = useSelector(state => state.data.loggedIn)
    // const [Latitude, setLatitude] = useState("");
    // const [Longitude, setLongitude] = useState("");
    // const [inputDate, setInputDate] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
                                                date_time: {
                                                    number: '',
                                                    textfield: 'Requested date:'
                                                },
                                                latitude: {
                                                    number: '',
                                                    textfield: 'Latitude, deg.:'
                                                },
                                                longitude: {
                                                    number: '',
                                                    textfield: 'Longitude, deg.:'
                                                },
                                                checkbox1: {
                                                    state: false,
                                                    id: 'wind_speed_10m:ms',
                                                    textfield: 'Wind speed, m/s'
                                                },
                                                checkbox2: 
                                                    {
                                                    state: false,
                                                    id: 'wind_dir_10m:d',
                                                    textfield: 'Wind direction, deg.'

                                                },
                                                checkbox3: 
                                                    {
                                                    state: false,
                                                    id: 't_2m:C',
                                                    textfield: 'Temperature, C'

                                                },
                                                checkbox4: 
                                                    {
                                                    state: false,
                                                    id: 'msl_pressure:hPa',
                                                    textfield: 'Mean pressure, hPa'

                                                },
                                                checkbox5: 
                                                    {
                                                    state: false,
                                                    id: 'sunrise:sql',
                                                    textfield: 'Sunrise'

                                                },
                                                checkbox6: 
                                                {
                                                    state: false,
                                                    id: 'sunset:sql',
                                                    textfield: 'Sunset'

                                                },
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        // console.log(name)
        if (target.type === 'checkbox') {
            
            const value = target.checked;
            setFormState(prevState => ({
            ...prevState,
            [name]: { ...prevState[name], state: value }
        }));
            // console.log(formState)
            // const value = target.type === 'checkbox' ? target.checked : target.value;
            // const name = target.name;
        } else {
            const value = target.value;
            setFormState({
                ...formState,
                [name]: value
            });
        }
    };

//   const handleRequest = (event) => {
//     event.preventDefault();
//     console.log(formState);
//   };


    const handleRequest = (event) => {
                                    event.preventDefault();
                                    if (!formState.latitude || !formState.longitude || !formState.date_time) {
                                    console.log('Please enter coordinates')
                                    } else {
                                            let params =  formState
                                            dispatch(SET_PARAMS(params))
                                            mmLogin(token).then(result => {
                                                                            apiRequest(result, params)
                                                                                .then(result => {
                                                                                                dispatch(SET_API_RESULT(result))
                                                                                                navigate('/result')
                                                                                                })
                                                                            });
                                             }
                                }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box
                // 
                sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                noValidate
                autoComplete="off"
                >
                    <Stack spacing={2} direction="column">
                    <p>Example Paris, Ile-de-France, France: <br /> Latitude: 48.8588897 <br /> Longitude: 2.320041</p>
                    <FormGroup>
                        <input hidden type="text" />
                        <TextField
                            id="outlined-basic"
                            label="Input date"
                            name="date_time"
                            placeholder='YYYY-MM-DD'
                            // value={}
                            onChange={handleInputChange}
                            // onChange={(e) => setInputDate(e.target.value)}
                        />
                                {/* <DatePicker
                                    value={inputDate}
                                    onChange={(e) => setInputDate(value)} 
                                    label="Insert date"
                                /> */}
                        <TextField
                            id="outlined-basic"
                            label="Latitude"
                            variant="outlined"
                            name="latitude"
                            placeholder='Latitude'
                            // value={formState.latitude}
                            onChange={handleInputChange}
                            // onChange={(e) => setLatitude(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Longitude"
                            variant="outlined"
                            name="longitude"
                            placeholder='Longitude'
                            // value={formState.longitude}
                            onChange={handleInputChange}
                        />
                        {loginStatus && (
                            <Stack spacing={2} direction="column">
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox1"
                                    value={formState.checkbox1}
                                    control={<Checkbox />}
                                    label="Wind speed, m/s"
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox2"
                                    value="wind_dir_10m:d"
                                    control={<Checkbox />}
                                    label="Wind direction, deg."
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox3"
                                    value="t_2m:C"
                                    control={<Checkbox />}
                                    label="Temperature, C"
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox4"
                                    value="msl_pressure:hPa"
                                    control={<Checkbox />}
                                    label="Mean pressure, hPa"
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox5"
                                    value="sunrise:sql"
                                    control={<Checkbox />}
                                    label="Sunrise"
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox6"
                                    value="sunset:sql"
                                    control={<Checkbox />}
                                    label="Sunset"
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />  
                            </Stack>
                            )}
                            <Button variant="contained" type="submit" onClick={handleRequest}>Send request</Button>
                        </FormGroup>
                    </Stack>
            </Box>
        </LocalizationProvider>
   );
};

export default Request