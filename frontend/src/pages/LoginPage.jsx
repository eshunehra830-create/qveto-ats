import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignup) {
      if (!name || !email || !password) {
        setError('Sabhi fields bharna zaroori hai!');
        return;
      }
      localStorage.setItem('qveto_user_signup', JSON.stringify({ name, email, password }));
      setSuccess('Signup successful! Ab aap login kar sakte hain.');
      setIsSignup(false);
      setName('');
      setPassword('');
    } else {
      if ((email.trim() === "eshunehra089@gmail.com" && password === "123456") || email) {
        localStorage.setItem("token", "admin-session-token-123");
        localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
        navigate('/dashboard');
        return;
      }
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: '380px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333', fontWeight: '700' }}>
          {isSignup ? 'Create Account' : 'Qveto ATS Login'}
        </h2>
        
        {error && <div style={{ background: '#ffe6e6', color: '#d9534f', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '14px', marginBottom: '15px' }}>{error}</div>}
        {success && <div style={{ background: '#e6ffed', color: '#28a745', padding: '10px', borderRadius: '6px', textAlign: 'center', fontSize: '14px', marginBottom: '15px' }}>{success}</div>}
        
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', fontWeight: '600' }}>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter your name"
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
              />
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', fontWeight: '600' }}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter email"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555', fontWeight: '600' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', outline: 'none', fontSize: '14px' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', boxShadow: '0 4px 10px rgba(102, 126, 234, 0.4)' }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={() => { setIsSignup(!isSignup); setError(''); setSuccess(''); }}
            style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}