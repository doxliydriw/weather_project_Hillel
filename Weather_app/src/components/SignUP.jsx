import React, { useState } from 'react';
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button, FormGroup, Stack, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { formValidation } from '../api/formValidation';
import { LOGIN_STATUS_CHANGE } from '../store/slice';
 
function SignUP() {
    
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
        },
        name: {
            value: '',
            regex: /^(?=.{1,25}$)([a-zA-Z]+ ){1,}[a-zA-Z]+$/,
        },
        phone: {
            value: '',
            regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        },
        url: {
            value: '',
            regex: '^(http|https)://[a-zA-Z0-9-\.]+\.[a-z]{2,4}(/([a-zA-Z0-9]+))*$'
        }
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        // console.log(name)
        const value = target.value;
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

    const sign = async (event) => {
        event.preventDefault();
        const target = event.target;
        console.log(target.email.value, target.password.value);
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
    if (Object.values(validationResult).every(val => val === true)) {
                        await createUserWithEmailAndPassword(auth, target.email.value, target.password.value)
                            .then((userCredential) => {
                                const user = userCredential.user;
                                updateProfile(user, {
                                    displayName: target.name.value,
                                    photoURL: target.url.value,
                                    phoneNumber: target.phone.value
                                }).then(() => {
                                    console.log(user);
                                    AuthStatusCheck();
                                    navigate('/')
                                })
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorCode, errorMessage);
                            });
        }
    
    // const TestUser = (user) => {
    //     if (user !== null) {
    //         const uid = user.uid;
    //         console.log('logged i UUI: ', uid);
    //         // if (user !== null) {
    //         //     user.providerData.forEach((profile) => {
    //         //         console.log("Sign-in provider: " + profile.providerId);
    //         //         console.log("  Provider-specific UID: " + profile.uid);
    //         //         console.log("  Name: " + profile.displayName);
    //         //         console.log("  Email: " + profile.email);
    //         //         console.log("  Photo URL: " + profile.photoURL);
    //         //     });
    //         //     updateProfile(user, {
    //         //     displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
    //         //     }).then(() => {
    //         //         console.log("  Name: " + profile.displayName);
    //         //     }).catch((error) => {
    //         //     console.log(user)
    //         //     });
    //         // }
    //     } else {
    //         console.log('user not logged in')
    //      }
    };
    
    return (
        <FormGroup>
                <form onSubmit={sign}>
                <Stack direction="column" sx={{ maxWidth: 300, }}>
                    <TextField
                        error={formState.email.notValid}
                        label={formState.email.notValid ? "Error" : "Input email"}
                        type="email"
                        name="email"
                        placeholder='email'
                        margin="dense"
                        onChange={handleInputChange}
                    />
                    <TextField
                        error={formState.password.notValid}
                        label={formState.password.notValid ? "Error" : "Input password"}
                        type="password"
                        name="password"
                        placeholder='password'
                        margin="dense"
                        onChange={handleInputChange} />
                    <TextField
                        error={formState.name.notValid}
                        label={formState.name.notValid ? "Error" : "Input full name"}
                        type="name"
                        name="name"
                        placeholder='Name'
                        margin="dense"
                        onChange={handleInputChange} />
                    <TextField
                        error={formState.phone.notValid}
                        label={formState.phone.notValid ? "Error" : "Input phone"}
                        type="phone"
                        name="phone"
                        placeholder='phone'
                        margin="dense"
                        onChange={handleInputChange} />
                    <TextField
                        error={formState.url.notValid}
                        label={formState.url.notValid ? "Error" : "Input avatar image link"}
                        type="url"
                        name="url"
                        placeholder='image url'
                        margin="dense"
                        onChange={handleInputChange} />
                    <Button variant="contained" type="submit">Sign UP </Button>
                </Stack>
            </form>
        </FormGroup>    
   );
};

export default SignUP