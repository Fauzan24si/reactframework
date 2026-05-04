import { FiUser, FiSearch, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        <div style={styles.logo}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>Furniture</h2>
          </Link>
        </div>
        
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li><Link to="/" style={{...styles.navLink, fontWeight: 600}}>Home</Link></li>
            <li><Link to="/products" style={styles.navLink}>Shop</Link></li>
            <li><a href="#" style={styles.navLink}>About</a></li>
            <li><a href="#" style={styles.navLink}>Contact</a></li>
          </ul>
        </nav>

        <div style={styles.icons}>
          <a href="#" style={styles.icon}><FiUser /></a>
          <a href="#" style={styles.icon}><FiSearch /></a>
          <a href="#" style={styles.icon}><FiHeart /></a>
          <a href="#" style={styles.icon}><FiShoppingCart /></a>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    padding: '24px 0',
    backgroundColor: 'var(--bg-color)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
  nav: {
    display: 'flex',
  },
  navList: {
    display: 'flex',
    gap: '40px',
  },
  navLink: {
    color: 'var(--text-dark)',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  },
  icons: {
    display: 'flex',
    gap: '24px',
  },
  icon: {
    color: 'var(--text-dark)',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  }
};

export default Header;
