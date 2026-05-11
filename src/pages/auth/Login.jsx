import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [dataForm, setDataForm] = useState({
    email: 'emilys',
    password: 'emilyspass'
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return; 
        }
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false); 
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome back</h2>
      <p style={styles.subtitle}>Welcome back please enter your details</p>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input 
            type="text" 
            name="email"
            value={dataForm.email} 
            onChange={handleChange} 
            placeholder="Enter your email"
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input 
            type="password" 
            name="password"
            value={dataForm.password} 
            onChange={handleChange}
            placeholder="............"
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.forgotRow}>
          <a href="#" style={styles.forgotLink}>Forgot password</a>
        </div>
        
        <button type="submit" disabled={loading} style={styles.primaryButton}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
        <button type="button" style={styles.googleButton}>
          Sign in with Google
        </button>
      </form>
      
      <p style={styles.footerText}>
        Don't have an account. <a href="#" style={styles.cyanLink}>Sign in</a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    fontFamily: 'Inter, sans-serif',
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '13px',
    color: '#9CA3AF',
    margin: '0 0 32px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '6px',
    border: '1px solid #E5E7EB',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  forgotRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-8px',
  },
  forgotLink: {
    fontSize: '12px',
    color: '#4FC3F7',
    textDecoration: 'none',
    fontWeight: '500',
  },
  primaryButton: {
    padding: '12px',
    backgroundColor: '#043CA5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'background 0.2s',
  },
  googleButton: {
    padding: '12px',
    backgroundColor: '#E1F5FE',
    color: '#0288D1',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  footerText: {
    marginTop: '40px',
    textAlign: 'center',
    fontSize: '12px',
    color: '#9CA3AF',
  },
  cyanLink: {
    color: '#4FC3F7',
    textDecoration: 'none',
    fontWeight: '500',
  },
  error: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '13px',
    border: '1px solid #fecaca',
  }
};

export default Login;

