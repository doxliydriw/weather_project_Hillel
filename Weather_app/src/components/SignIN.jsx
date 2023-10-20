import React, { useState } from 'react';
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Button, FormGroup, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { LOGIN_STATUS_CHANGE } from '../store/slice';
import { useNavigate } from 'react-router';

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const HandleChange = e => {
        setForm({
            ...form,
            [e.target.type]: e.target.value
        })
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

    const sign = () => {
        // console.log(form);
        const email = form.email;
        const password = form.password;
                        signInWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                // Signed in 
                                const user = userCredential.user;
                                console.log(user, 'LOGGED IN');
                                AuthStatusCheck();
                                navigate('/')

                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorCode, errorMessage);
                            });
                        }

        return (
            <FormGroup>
                <Stack direction="column" sx={{ maxWidth: 300, }}>
                    <TextField type="email" placeholder='email' margin="dense" onChange={HandleChange} />
                    <TextField type="password" placeholder='password' margin="dense" onChange={HandleChange} />
                    <Button variant="contained" type="submit" onClick={sign}>Sign In</Button>
                </Stack>
            </FormGroup>
        );
    };

export default SignIn