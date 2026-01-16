import React, { useState } from 'react';

const AuthForm = ({ onLogin, onGoogleLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password, isLogin, name);
    };

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
        },
        card: {
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '3rem',
            width: '100%',
            maxWidth: '450px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            textAlign: 'center',
            animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        },
        logo: {
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            display: 'block',
        },
        appName: {
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '2rem',
            letterSpacing: '-0.5px',
        },
        input: {
            width: '100%',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '12px',
            border: '2px solid transparent',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease',
            color: '#4a5568',
        },
        btn: {
            width: '100%',
            padding: '1rem',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#2d3748',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            marginBottom: '1.5rem',
        },
        googleBtn: {
            width: '100%',
            padding: '0.8rem',
            borderRadius: '12px',
            border: '2px solid #e2e8f0',
            backgroundColor: '#fff',
            color: '#2d3748',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'all 0.2s',
            marginBottom: '1.5rem',
        },
        toggleText: {
            fontSize: '0.9rem',
            color: '#718096',
            marginBottom: '1rem',
        },
        link: {
            color: '#2b6cb0',
            fontWeight: '600',
            cursor: 'pointer',
            marginLeft: '5px',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <span style={styles.logo}>📝</span>
                <h1 style={styles.appName}>KeepIt</h1>

                <h2 style={{ marginBottom: '1.5rem', color: '#4a5568' }}>
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            style={styles.input}
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            onFocus={(e) => e.target.style.borderColor = '#a3c4f3'}
                            onBlur={(e) => e.target.style.borderColor = 'transparent'}
                        />
                    )}
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        onFocus={(e) => e.target.style.borderColor = '#a3c4f3'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                    />
                    <input
                        style={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onFocus={(e) => e.target.style.borderColor = '#a3c4f3'}
                        onBlur={(e) => e.target.style.borderColor = 'transparent'}
                    />

                    <button
                        type="submit"
                        style={styles.btn}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 1.5rem' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                    <span style={{ padding: '0 10px', color: '#a0aec0', fontSize: '0.9rem' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                </div>

                <button
                    style={styles.googleBtn}
                    onClick={onGoogleLogin}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f7fafc'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        width="20"
                        height="20"
                    />
                    Continue with Google
                </button>

                <p style={styles.toggleText}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span
                        style={styles.link}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
