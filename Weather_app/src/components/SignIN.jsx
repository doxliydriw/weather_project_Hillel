import React, { useState } from 'react';
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Button, FormGroup, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { LOGIN_STATUS_CHANGE } from '../store/slice';
import { useNavigate } from 'react-router';
import { formValidation } from '../api/formValidation';

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [formState, setFormState] = useState({
        email: {
            value: '',
            regex: /^([a-zA-Z0-9_.-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9.-]+)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        },
        password: {
            value: '',
            regex: /^.{8,}$/
        }
    })

    const HandleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        // console.log(name, value)
        setFormState(prevState => {
                const updatedObject = { ...prevState[name], value: value };
                if ('notValid' in updatedObject) {
                    delete updatedObject.notValid;
                }
                return {
                    ...prevState,
                    [name]: updatedObject
                };
        })
        // console.log(formState)
    }

    const AuthStatusCheck = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(LOGIN_STATUS_CHANGE(true));
                const uid = user.uid;
            } else {

            }
        });
    }

    const sign = (event) => {
        event.preventDefault();
        const email = formState.email.value;
        const password = formState.password.value;
        const validationResult = formValidation(formState);
        for (let i of Object.keys(validationResult)) {
            setFormState(prevState => ({
                ...prevState,
                [i]: {
                    ...prevState[i],
                    notValid: !validationResult[i]
                }
            }));
        }
        console.log(validationResult, email, password)

        if (Object.values(validationResult).every(val => val === true)) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    AuthStatusCheck();
                    navigate('/')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('No such USER in Firebase')
                    console.log(errorCode, errorMessage);
                });
        }
    }

    return (
        <FormGroup>
            <form onSubmit={sign}>
                <Stack direction="column" sx={{ maxWidth: 300, }}>
                    <TextField
                        error={formState.email.notValid}
                        label={formState.email.notValid ? "Error" : "Input email"}
                        name='email'
                        type="email"
                        placeholder='email'
                        margin="dense"
                        onChange={HandleChange} />
                    <TextField
                        error={formState.password.notValid}
                        label={formState.password.notValid ? "Error" : "Input password"}
                        name='password'
                        type="password"
                        placeholder='password'
                        margin="dense"
                        onChange={HandleChange} />
                    <Button variant="contained" type="submit">Sign In</Button>
                </Stack>
            </form>
            </FormGroup>
        );
    };

export default SignIn