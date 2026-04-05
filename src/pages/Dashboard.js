import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, MessageSquare, Briefcase, GraduationCap } from 'lucide-react';

const Dashboard = ({ user }) => {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Hello, {user.name}!</h1>
        <p style={{ color: 'var(--text-muted)' }}>Welcome to your personalized career insights center.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Profile Card */}
        <div className="glass-card" style={{ height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-main)', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{user.name[0]}</span>
            </div>
            <h3>{user.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{user.email}</p>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
             <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-muted)' }}>QUICK ACTIONS</p>
             <Link to="/predict" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', marginBottom: '0.5rem', textDecoration: 'none', color: 'white' }}>
               <BrainCircuit size={18} color="var(--primary-light)" />
               <span>New Prediction</span>
             </Link>
             <Link to="/chat" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', textDecoration: 'none', color: 'white' }}>
               <MessageSquare size={18} color="var(--secondary)" />
               <span>AI Assistant</span>
             </Link>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={20} color="var(--primary-light)" />
              Recent Predictions
            </h3>
            <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed var(--border)', borderRadius: '1rem' }}>
               <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You haven't run any career predictions yet.</p>
               <Link to="/predict" className="btn-primary">Get Your First Insight</Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <GraduationCap size={24} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h4>Skill Tracking</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Monitor your progress on recommended skills.</p>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <LayoutDashboard size={24} color="#f59e0b" style={{ marginBottom: '1rem' }} />
              <h4>Roadmap</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Step-by-step guide to your target career.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
