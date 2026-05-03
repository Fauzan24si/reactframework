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
    e.preventDefault()

    setLoading(true)
    setError(false)

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        // Jika status bukan 200, tampilkan pesan error
        if (response.status !== 200) {
          setError(response.data.message);
          return; 
        }

        // Redirect ke dashboard jika login sukses
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || "An error occurred");
        } else {
          setError(err.message || "An unknown error occurred");
        }
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
    <div style={styles.card}>
      <h2 style={styles.title}>Admin Login</h2>
      <p style={styles.subtitle}>Sign in to access the dashboard</p>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username / Email</label>
          <input 
            type="text" 
            name="email"
            value={dataForm.email} 
            onChange={handleChange} 
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
            style={styles.input}
            required
          />
        </div>
        
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '28px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none',
  },
  button: {
    padding: '14px',
    backgroundColor: '#054C73',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.2s, transform 0.1s',
    fontFamily: 'inherit',
  },
  error: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '10px',
    fontSize: '14px',
    textAlign: 'center',
    border: '1px solid #fecaca',
  }
};

export default Login;

