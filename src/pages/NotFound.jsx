import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.code}>404</div>
        <h1 style={styles.title}>Halaman tidak ditemukan</h1>
        <p style={styles.desc}>
          URL yang kamu tuju tidak ada atau mungkin sudah dipindah.
          Periksa alamat lagi atau kembali ke halaman utama.
        </p>

        <div style={styles.actions}>
          <button onClick={() => navigate(-1)} style={styles.btnGhost}>
            <FiArrowLeft /> Kembali
          </button>
          <Link to="/" style={styles.btnPrimary}>
            <FiHome /> Ke Beranda
          </Link>
        </div>

        <div style={styles.links}>
          <span style={styles.linksLabel}>Tautan cepat:</span>
          <Link to="/admin/dashboard" style={styles.quickLink}>Dashboard</Link>
          <Link to="/products" style={styles.quickLink}>Products</Link>
          <Link to="/users" style={styles.quickLink}>Users</Link>
          <Link to="/sales-report" style={styles.quickLink}>Sales Report</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #F4F5F7 0%, #DFE9F4 100%)',
    padding: '24px',
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(5, 76, 115, 0.08)',
    padding: '56px 48px',
    maxWidth: '520px',
    width: '100%',
    textAlign: 'center',
  },
  code: {
    fontSize: '96px',
    fontWeight: 900,
    color: '#054C73',
    lineHeight: 1,
    letterSpacing: '-0.05em',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #054C73 0%, #B88E2F 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 12px',
  },
  desc: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.6,
    margin: '0 0 32px',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#054C73',
    color: '#fff',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
  },
  btnGhost: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'transparent',
    color: '#374151',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  links: {
    paddingTop: '24px',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  linksLabel: {
    fontSize: '12px',
    color: '#9ca3af',
    marginRight: '4px',
  },
  quickLink: {
    fontSize: '13px',
    color: '#054C73',
    fontWeight: 600,
    textDecoration: 'none',
  },
};

export default NotFound;
