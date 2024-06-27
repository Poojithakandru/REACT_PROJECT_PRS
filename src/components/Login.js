import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import '../App.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            navigate("/", {state: {email: userCredential.user.email}});
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email address to send a reset link.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert("A password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password.");
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        }
    };

    return (
        <div className='login'>
            <h1>Signin</h1>
            <form className='form' onSubmit={handleSignin}>
                <input type="email" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required />
                <input type='password' placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required />
                <button type="submit">Signin</button>
            </form>
            <button onClick={handleForgotPassword}>Forgot Password?</button>
            {error && <p className='error'>{error}</p>}
            <button onClick={() => navigate("/register")}>You don't have an account? Register</button>
        </div>
    )
}

export default Login;
