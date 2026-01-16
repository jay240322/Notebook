import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin, onGoogleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <span className="auth-logo">📝</span>
                <h1 className="app-name">KeepIt</h1>

                <h2 className="auth-header">Welcome Back</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="auth-btn">
                        Sign In
                    </button>
                </form>

                <div className="divider">
                    <div className="divider-line" />
                    <span className="divider-text">OR</span>
                    <div className="divider-line" />
                </div>

                <button className="google-btn" onClick={onGoogleLogin}>
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        width="20"
                        height="20"
                    />
                    Continue with Google
                </button>

                <p className="toggle-text">
                    Don't have an account?
                    <Link to="/signup" className="auth-link">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
