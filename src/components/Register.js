import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import './LoginRegister.css';

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
            navigate("/", { state: { email: userCredential.user.email } });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            navigate("/", { state: { email: result.user.email } });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form className="form" onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <div className="links">
                Already have an account? Please <a href="#" onClick={() => navigate("/login")}>Login</a>
            </div>
            <button className="google-btn" onClick={handleGoogleRegister}>
                <img src="https://t4.ftcdn.net/jpg/03/08/54/37/360_F_308543787_DmPo1IELtKY9hG8E8GlW8KHEsRC7JiDN.jpg" alt="Google logo" /> Login with Google
            </button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Register;
