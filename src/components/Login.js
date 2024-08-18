import React, { useState } from 'react';

function Login({ onLogin }) {
  // State to store username, password, and any error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // This is a super basic check - in a real app, we'd validate against a backend
    if (username === 'admin' && password === 'password') {
      // If login is successful, store that info and call the onLogin function
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      // If login fails, show an error message
      setError('Invalid credentials');
    }
  };

  // Render our login form
  return (
    <div className="login-form">
      <h2>Admin Login</h2>
      {/* Show error message if there is one */}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;