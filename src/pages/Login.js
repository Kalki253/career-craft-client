import React, { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const response = await axios.post(endpoint, formData);
      
      if (response.data.success) {
        const userData = response.data.data;
        localStorage.setItem('career_craft_user', JSON.stringify(userData));
        setUser(userData);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Connection to server failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem' }}>
          {isLogin ? 'Welcome Back' : 'Join Career Craft'}
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
          {isLogin ? 'Enter your credentials to continue' : 'Create an account to start your journey'}
        </p>

        {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1rem', top: '0.875rem', color: 'var(--text-muted)' }} size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="input-field" 
                style={{ paddingLeft: '3rem' }}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: '1rem', top: '0.875rem', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="input-field" 
              style={{ paddingLeft: '3rem' }}
              value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '1rem', top: '0.875rem', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="input-field" 
              style={{ paddingLeft: '3rem' }}
              value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {loading ? <Loader2 className="loading-spinner" style={{ width: '1.25rem', height: '1.25rem' }} /> : (isLogin ? 'Sign In' : 'Create Account')}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: 'var(--primary-light)', fontWeight: '700', cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
