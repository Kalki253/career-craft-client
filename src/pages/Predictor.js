import React, { useState } from 'react';
import axios from '../api';
import { BrainCircuit, Loader2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

const Predictor = () => {
  const [interest, setInterest] = useState('');
  const [skill, setSkill] = useState('');
  const [stream, setStream] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!interest || !skill || !stream) {
      setError('Please fill in all fields to get an accurate prediction.');
      return;
    }

    setError('');
    setLoading(true);
    setPrediction(null);

    try {
      // Backend acts as a bridge to Flask for Zero-Hardcoded-Ports deployment strategy
      const response = await axios.post('/api/predict', { interest, skill, stream });
      
      if (response.data.success) {
        setPrediction(response.data.career);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'The AI service is currently unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const careers = {
    "Software Engineer": {
      desc: "Develop software, apps, and systems. Great for logical thinkers and problem solvers.",
      path: ["Learn Programming", "Build Portfolio", "Get Certified"]
    },
    "Doctor": {
      desc: "Save lives and improve health through medicine. Requires deep scientific knowledge and empathy.",
      path: ["Clear NEET/Entrance", "Complete MBBS", "Specialize"]
    },
    "Entrepreneur": {
      desc: "Start and grow businesses. Perfect for risk-takers with strong leadership skills.",
      path: ["Idea Validation", "Market Research", "Build MVP"]
    },
    "UI/UX Designer": {
      desc: "Create beautiful, functional user interfaces. Ideal for creative minds with an eye for detail.",
      path: ["Design Theory", "Master Figma", "User Research"]
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>AI Career Predictor</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Input your preferences and let our Decision Tree model suggest the best professional path for you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1fr', gap: '3rem' }}>
        <div className="glass-card">
          <form onSubmit={handlePredict}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Area of Interest</label>
            <select className="input-field" value={interest} onChange={(e) => setInterest(e.target.value)}>
              <option value="">Select Interest</option>
              <option value="coding">Coding & Software</option>
              <option value="biology">Medical & Biology</option>
              <option value="business">Management & Business</option>
              <option value="design">Art & Design</option>
            </select>

            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Key Skill</label>
            <select className="input-field" value={skill} onChange={(e) => setSkill(e.target.value)}>
              <option value="">Select Skill</option>
              <option value="math">Mathematics & Logic</option>
              <option value="analysis">Research & Analysis</option>
              <option value="communication">Communication & Pitching</option>
              <option value="creativity">Creative Thinking</option>
            </select>

            <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block' }}>Academic Stream</label>
            <select className="input-field" value={stream} onChange={(e) => setStream(e.target.value)}>
              <option value="">Select Stream</option>
              <option value="science">PCM / PCB (Science)</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts / Humanities</option>
            </select>

            {error && (
              <div style={{ display: 'flex', gap: '0.5rem', color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <AlertCircle size={18} /> {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? <Loader2 className="loading-spinner" /> : <BrainCircuit size={20} />}
              {loading ? 'Analyzing Profile...' : 'Predict Career Path'}
            </button>
          </form>
        </div>

        <div>
          {prediction ? (
            <div className="glass-card" style={{ border: '2px solid var(--primary-light)', animation: 'fadeIn 0.5s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  MATCH FOUND!
                </div>
                <button onClick={() => setPrediction(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <RefreshCw size={18} />
                </button>
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {prediction}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                {careers[prediction]?.desc || "This field aligns perfectly with your reported interest in " + interest + " and your " + skill + " skills."}
              </p>
              
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1rem' }}>
                <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} color="var(--secondary)" /> Suggested Roadmap
                </h4>
                {careers[prediction]?.path.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {i + 1}
                    </div>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border)', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' }}>
              <div style={{ opacity: 0.5 }}>
                <BrainCircuit size={64} color="var(--primary-light)" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
                <p>Predictions will appear here once you fill the form.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Predictor;
