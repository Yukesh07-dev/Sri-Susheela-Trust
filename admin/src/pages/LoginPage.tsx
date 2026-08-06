import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';
import axios from 'axios';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (res.data?.success && res.data?.token) {
        localStorage.setItem('sst_admin_token', res.data.token);
        localStorage.setItem('sst_admin_user', JSON.stringify(res.data.user));
        navigate('/');
      } else {
        setErrorMsg(res.data?.message || 'Authentication failed.');
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        // Fallback for offline demo check
        if (email.toLowerCase() === 'admin@srisusheelatrust.org' && password === 'admin123') {
          localStorage.setItem('sst_admin_token', 'demo_offline_token_2026');
          localStorage.setItem('sst_admin_user', JSON.stringify({ name: 'Sri Susheela Admin', email }));
          navigate('/');
          return;
        }
        setErrorMsg('Unable to connect to auth server. Use admin@srisusheelatrust.org / admin123');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 30%, #261B11 0%, #120D08 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(34, 25, 16, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(212, 175, 55, 0.35)',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.15)',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              margin: '0 auto 1rem auto',
              background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
              border: '2px solid #D4AF37',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={36} color="#FFD700" />
          </div>
          <h2 style={{ color: '#FFFDF5', fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
            Sri Susheela Trust
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
            Admin Portal Access
          </span>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              color: '#FCA5A5',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#E8DFD5', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Admin Email ID
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A89888' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@srisusheelatrust.org"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  background: '#120D08',
                  border: '1.5px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '10px',
                  color: '#FFFDF5',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#E8DFD5', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A89888' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. admin123)"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                  background: '#120D08',
                  border: '1.5px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '10px',
                  color: '#FFFDF5',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#A89888',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '10px',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
              color: '#FFD700',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 8px 20px rgba(122, 28, 28, 0.45)',
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};
