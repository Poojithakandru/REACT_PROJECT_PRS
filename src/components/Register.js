import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import '../App.css';

const googleProvider = new GoogleAuthProvider();

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate("/", {state: {email: userCredential.user.email}});
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    }

    const handleGoogleRegister = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log(user);
            navigate("/", {state: {email: user.email}});
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    }

    return (
        <div className='register'>
            <h1>Register</h1>
            <form className='form' onSubmit={handleRegister}>
                <input type="email" placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}
                required/>
                <input type='password' placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}
                required/>
                <button type="submit">Register</button>
            </form>
            <button onClick={handleGoogleRegister}>Register with Google</button>
            {error && <p className='error'>{error}</p>}
            <button onClick={() => navigate("/login")}>Already have an account? Sign In</button>
        </div>
    )
}

export default Register;
