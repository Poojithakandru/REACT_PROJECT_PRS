import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import './LoginRegister.css';

const googleProvider = new GoogleAuthProvider();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigate("/", { state: { email: userCredential.user.email } });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email address.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setError("Password reset email sent!");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            navigate("/", { state: { email: result.user.email } });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form className="form" onSubmit={handleSignin}>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={handleForgotPassword}>Forgot Password?</button>
            <div className="links">
                Don't have an account? Please <a href="#" onClick={() => navigate("/register")}>Register</a> here.
            </div>
            <button className="google-btn" onClick={handleGoogleSignIn}>
                <img src="https://t4.ftcdn.net/jpg/03/08/54/37/360_F_308543787_DmPo1IELtKY9hG8E8GlW8KHEsRC7JiDN.jpg" alt="Google logo" /> Login with Google
            </button>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Login;
