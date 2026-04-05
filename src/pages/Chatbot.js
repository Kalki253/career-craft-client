import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Trash2 } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am your Career Assistant. To get started, tell me which academic stream you are in (Science, Commerce, or Arts)?' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsgs = [...messages, { role: 'user', text: userText }];
    setMessages(newMsgs);
    setInput('');

    // Rule-based logic
    setTimeout(() => {
      let botReply = '';
      const text = userText.toLowerCase();

      if (text.includes('science')) {
        botReply = "Science is great! You can go for Engineering (IT, Mechanical, Civil) or Medical (MBBS, Pharma). Do you enjoy math?";
      } else if (text.includes('commerce')) {
        botReply = "Commerce offers careers like Chartered Accountant (CA), Business Management (BBA/MBA), or Finance. Are you interested in numbers?";
      } else if (text.includes('arts') || text.includes('humanities')) {
        botReply = "Arts leads to Creative Design, Media, Law, or Psychology. Do you consider yourself more creative or analytical?";
      } else if (text.includes('math') || text.includes('numbers')) {
        botReply = "Excellent. You should consider Software Engineering or Data Science for Science, or CA/Investment Banking for Commerce.";
      } else if (text.includes('creative') || text.includes('design')) {
        botReply = "With a creative spark, you fits well into UI/UX Design, Fashion, or Digital Marketing.";
      } else {
        botReply = "Interesting! Could you tell me more about your favorite subject in school?";
      }

      setMessages([...newMsgs, { role: 'bot', text: botReply }]);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '800px', height: '70vh', padding: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '0.75rem' }}>
               <Bot size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem' }}>Career Craft Helper</h3>
              <p style={{ fontSize: '0.75rem', color: '#10b981' }}>Always Online</p>
            </div>
          </div>
          <button onClick={() => setMessages([messages[0]])} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
             <Trash2 size={20} />
          </button>
        </div>

        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              {msg.role === 'bot' && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={16} />
                </div>
              )}
              <div style={{ 
                padding: '1rem', 
                borderRadius: '1.25rem', 
                fontSize: '0.925rem',
                background: msg.role === 'user' ? 'var(--gradient-main)' : 'rgba(255,255,255,0.05)',
                color: 'white',
                borderTopRightRadius: msg.role === 'user' ? 0 : '1.25rem',
                borderTopLeftRadius: msg.role === 'user' ? '1.25rem' : 0,
                boxShadow: msg.role === 'user' ? '0 10px 15px -3px rgba(99, 102, 241, 0.3)' : 'none'
              }}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                   <User size={16} color="white" />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Type your message here..." 
            className="input-field" 
            style={{ marginBottom: 0, borderRadius: '99px' }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0.875rem', borderRadius: '50%', width: '3rem', height: '3rem', justifyContent: 'center' }}>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
