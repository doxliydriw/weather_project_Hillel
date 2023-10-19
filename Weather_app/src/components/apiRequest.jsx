import React, { useEffect, useState } from 'react';
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

import { SET_API_RESULT, SET_PARAMS } from '../store/slice';
import { mmLogin } from '../api/mm_login';
import { useNavigate } from 'react-router';
import { formValidation } from '../api/formValidation';

 
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

    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // console.log('refresh')
        // console.log(isSubmitted)
        setFormState({
                                                date_time: {
                                                    number: '',
                                                    textfield: 'Requested date:',
                                                    // valid: false
                                                },
                                                latitude: {
                                                    number: '',
                                                    textfield: 'Latitude, deg.:',
                                                    regex: '^([-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?))$'
                                                },
                                                longitude: {
                                                    number: '',
                                                    textfield: 'Longitude, deg.:',
                                                    regex: '^([-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?))$'
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
    })
        setIsSubmitted(false);
        // console.log(formState)
  }, [isSubmitted]);


    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        // const dateValid = isDateInRange(target.value);
        // console.log(dateValid);
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
            setFormState(prevState => ({
            ...prevState,
            [name]: { ...prevState[name], number: value }
            }));
        }
    };

//   const handleRequest = (event) => {
//     event.preventDefault();
//     console.log(formState);
//   };


    const handleRequest = (event) => {
        event.preventDefault();
        const validationResult = formValidation(formState);
        console.log(validationResult.checkbox[0][0]);
                                    // if (!formState.latitude.number || !formState.longitude.number || !formState.date_time.number) {
                                    //     alert('Please enter coordinates')
                                    // } else {
                                    //         let params =  formState
                                    //         dispatch(SET_PARAMS(params))
                                    //         mmLogin(token).then(result => {
                                    //                                         apiRequest(result, params)
                                    //                                             .then(result => {
                                    //                                                             dispatch(SET_API_RESULT(result))
                                    //                                                             setIsSubmitted(true);
                                    //                                                             navigate('/result')
                                    //                                                             })
                                    //                                         });
                                    //          }
                                }

    return (
        // <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box
                // 
                sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
                // noValidate
                autoComplete="off"
                >
                    <Stack direction="column">
                    <p>Example Paris, Ile-de-France, France: <br /> Latitude: 48.8588897 <br /> Longitude: 2.320041</p>
                    <FormGroup>
                        <TextField
                            id="date_time"
                            label="Input date"
                            name="date_time"
                            placeholder='YYYY-MM-DD'
                            value={formState.date_time.number}
                            margin="dense"
                            onChange={handleInputChange}
                        
                            // onChange={(e) => setInputDate(e.target.value)}
                        />
                                {/* <DatePicker
                                    value={inputDate}
                                    onChange={(e) => setInputDate(value)} 
                                    label="Insert date"
                                /> */}
                        <TextField
                            id="latitude"
                            label="Latitude"
                            variant="outlined"
                            name="latitude"
                            placeholder='Latitude'
                            value={formState.latitude.number}
                            margin="dense"
                            onChange={handleInputChange}
                            // onChange={(e) => setLatitude(e.target.value)}
                        />
                        <TextField
                            id="longitude"
                            // error
                            // id="outlined-error"
                            // label="Error"
                            label="Longitude"
                            variant="outlined"
                            name="longitude"
                            placeholder='Longitude'
                            value={formState.longitude.number}
                            margin="dense"
                            onChange={handleInputChange}
                    />
                        <FormControlLabel
                                    type="checkbox"
                                    name="checkbox3"
                                    value="t_2m:C"
                                    checked={formState.checkbox3.state}
                                    control={<Checkbox />}
                                    label="Temperature, C"
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                        {loginStatus && (
                            <Stack spacing={0} direction="column">
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox1"
                                    checked={formState.checkbox1.state}
                                    value="wind_speed_10m:ms"
                                    control={<Checkbox />}
                                    label="Wind speed, m/s"
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox2"
                                    value="wind_dir_10m:d"
                                    checked={formState.checkbox2.state}
                                    control={<Checkbox />}
                                    label="Wind direction, deg."
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox4"
                                    value="msl_pressure:hPa"
                                    checked={formState.checkbox4.state}
                                    control={<Checkbox />}
                                    label="Mean pressure, hPa"
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox5"
                                    value="sunrise:sql"
                                    checked={formState.checkbox5.state}
                                    control={<Checkbox />}
                                    label="Sunrise"
                                    labelPlacement="end"
                                    onChange={handleInputChange}
                                />
                            <FormControlLabel
                                    type="checkbox"
                                    name="checkbox6"
                                    value="sunset:sql"
                                    checked={formState.checkbox6.state}
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
        // </LocalizationProvider>
   );
};

export default Request