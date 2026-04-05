import React, { useState } from 'react';
import axios from '../api';
import { Mail, Send, CheckCircle, Loader2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
        setError('Please fill in all fields');
        return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/contact', formData);
      if (response.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setError('Failed to send message. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '1rem', background: 'rgba(168, 85, 247, 0.1)', color: 'var(--secondary)', marginBottom: '1rem' }}>
            <Mail size={32} />
          </div>
          <h2>Contact Our Career Experts</h2>
          <p style={{ color: 'var(--text-muted)' }}>We usually respond within 24 hours.</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
             <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1rem' }} />
             <h3>Message Sent!</h3>
             <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Thank you for reaching out. We will get back to you shortly.</p>
             <button onClick={() => setSubmitted(false)} className="btn-primary" style={{ marginTop: '2rem' }}>Send Another Message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="input-field" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="input-field" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Message</label>
            <textarea 
              rows="5" 
              placeholder="How can we help you?" 
              className="input-field" 
              style={{ resize: 'none' }}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>

            {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? <Loader2 className="loading-spinner" /> : <Send size={20} />}
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
