import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <main className="landing-main">
                <div className="hero-content">
                    <h1 className="landing-title">Capture Your Thoughts</h1>
                    <p className="landing-subtitle">
                        The smartest way to organize your ideas. Simple, secure, and beautiful functionality for your daily notes.
                    </p>

                    <div className="button-group">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/login')}
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Quick Notes</h3>
                            <p className="feature-desc">Instantly capture ideas with our lightning-fast editor designed for speed.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🛡️</div>
                            <h3 className="feature-title">Secure Storage</h3>
                            <p className="feature-desc">Your data is protected with enterprise-grade encryption and security.</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="footer">
                <p>© {new Date().getFullYear()} KeepIt. All rights reserved.</p>
                <div className="footer-links">
                    <span className="footer-link">Privacy</span>
                    <span className="footer-link">Terms</span>
                    <span className="footer-link">Contact</span>
                </div>
                <p>
                    <a
                        href="https://github.com/jay240322"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: "#a2a3a3ff",
                            fontWeight: "600",
                            cursor: "pointer",
                            textDecoration: "none",
                        }}
                    >
                        owner : jay240322
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
