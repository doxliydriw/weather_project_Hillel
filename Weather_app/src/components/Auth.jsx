import React, { useState } from 'react';
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
 
function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const singIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    return (
        <>
                <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)}/> 
                <input type="password" placeholder='password'onChange={(e) => setPassword(e.target.value)}/> 
                <button onClick={singIn}>Sign in</button>
        </>
   );
};

export default Auth