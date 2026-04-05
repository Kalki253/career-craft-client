import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BrainCircuit, Rocket, Target } from 'lucide-react';

const Home = ({ user }) => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ marginBottom: '2rem', display: 'inline-flex', padding: '0.5rem 1rem', borderRadius: '99px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--primary-light)', fontSize: '0.875rem', fontWeight: '600' }}>
        ✨ Powered by Decision Tree ML
      </div>
      <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Shape Your Future with <br /> AI Career Guidance
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 3rem' }}>
        Discover the perfect career path based on your interests, skills, and academic stream using our advanced career prediction engine.
      </p>
      
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '5rem' }}>
        <Link to={user ? "/predict" : "/login"} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
          Explore Now <Rocket size={20} />
        </Link>
        <Link to="/contact" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', background: 'transparent', border: '1px solid var(--border)' }}>
          Contact Us
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {[
          { icon: <BrainCircuit size={32} color="#6366f1" />, title: "AI Analysis", desc: "Machine learning models analyze your profile to find high-probability career matches." },
          { icon: <Target size={32} color="#a855f7" />, title: "Personalized Roadmap", desc: "Get detailed guidance on what to study and which skills to acquire next." },
          { icon: <Sparkles size={32} color="#f59e0b" />, title: "Career Chatbot", desc: "Interact with our intelligent assistant for instant career-related queries." }
        ].map((feat, i) => (
          <div key={i} className="glass-card" style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1.5rem' }}>{feat.icon}</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feat.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
