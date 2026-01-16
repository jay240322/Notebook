import React from 'react';

const Navbar = ({ appName, profileName, theme, toggleTheme, onLogout }) => {
  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'var(--glass-bg)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--glass-border)',
      boxShadow: 'var(--shadow-sm)',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'var(--text-color)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    profileName: {
      fontWeight: '500',
      color: 'var(--text-color)',
    },
    themeToggle: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.2rem',
      padding: '0.5rem',
      borderRadius: '50%',
      transition: 'var(--transition)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span>📝</span>
        <span>{appName}</span>
      </div>

      <div style={styles.profileSection}>
        <span style={styles.profileName}>Hello, {profileName}</span>
        <button
          onClick={toggleTheme}
          style={styles.themeToggle}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              ...styles.themeToggle,
              marginLeft: '10px',
              color: '#e53e3e'
            }}
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
