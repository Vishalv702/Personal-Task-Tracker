import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Login = ({ onLogin, darkMode }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username.trim());
      setUsername('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className={`login-container ${darkMode ? 'dark' : ''}`}>
      <div className="login-box">
        <div className="login-header">
          <div className="login-icon">
            <Check className="icon-check" />
          </div>
          <h1 className="login-title">Task Tracker</h1>
          <p className="login-subtitle">Sign in to manage your tasks</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <button onClick={handleLogin} className="login-button">
            <Check className="button-icon" />
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
