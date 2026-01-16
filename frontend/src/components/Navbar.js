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
          >
            ⏻
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
