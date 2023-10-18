import React, { useState } from 'react';
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button, FormGroup, Stack, TextField } from '@mui/material';
 
function SignUP() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = auth.currentUser;
    
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
    // };

    const sign = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
        
    };

    

    return (
        <FormGroup>
                <Stack spacing={1} direction="column" sx={{ maxWidth: 300, }}>
                    <TextField type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)}/> 
                    <TextField type="password" placeholder='password'onChange={(e) => setPassword(e.target.value)}/> 
                    <Button variant="contained" type="submit" onClick={sign}>Sign up</Button>
                </Stack>
            </FormGroup>    
   );
};

export default SignUP