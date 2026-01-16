import React from 'react';
import './Navbar.css';

const Navbar = ({ appName, profileName, theme, toggleTheme, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>📝</span>
        <span>{appName}</span>
      </div>

      <div className="navbar-profile">
        <span className="profile-name">Hello, {profileName}</span>
        <button
          onClick={toggleTheme}
          className="nav-btn"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {onLogout && (
          <button
            onClick={onLogout}
            className="nav-btn logout-btn"
            title="Logout"
            aria-label="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
