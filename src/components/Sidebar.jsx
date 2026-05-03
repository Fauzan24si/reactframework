import { FiGrid, FiUser, FiBarChart2, FiShoppingCart, FiBox, FiTrendingUp, FiMessageSquare, FiSettings, FiStar, FiClock, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const sidebarStyles = `
  .sidebar {
    width: 260px;
    min-width: 260px;
    background: #fff;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow-y: auto;
    box-shadow: 1px 0 3px rgba(0,0,0,0.03);
    z-index: 30;
  }

  .sidebar-logo {
    padding: 20px 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #f1f5f9;
    position: sticky;
    top: 0;
    background: #fff;
    flex-shrink: 0;
  }

  .sidebar-logo-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: #2563eb;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 3px 6px rgba(37,99,235,0.25);
    flex-shrink: 0;
  }

  .sidebar-logo-icon span {
    font-size: 13px;
    color: #fff;
    font-weight: 800;
    line-height: 1;
  }

  .sidebar-logo-text {
    font-size: 17px;
    font-weight: 700;
    color: #1e293b;
    letter-spacing: -0.3px;
    line-height: 1;
  }

  .sidebar-nav {
    flex: 1;
    padding: 16px 12px;
  }

  .sidebar-label {
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #94a3b8;
    padding: 0 12px;
    margin: 0 0 8px 0;
    line-height: 1;
  }

  .sidebar-label.mt {
    margin-top: 24px;
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s ease;
    margin-bottom: 2px;
    text-decoration: none;
  }

  .sidebar-item:hover {
    background: #f8fafc;
  }

  .sidebar-item:hover .si-icon {
    color: #3b82f6;
  }

  .sidebar-item:hover .si-text {
    color: #1e293b;
  }

  .sidebar-item.active {
    background: #eff6ff;
  }

  .sidebar-item.active .si-icon {
    color: #2563eb;
  }

  .sidebar-item.active .si-text {
    color: #1d4ed8;
    font-weight: 600;
  }

  .si-icon {
    width: 20px;
    height: 20px;
    color: #94a3b8;
    transition: color 0.15s;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .si-icon svg {
    width: 18px;
    height: 18px;
  }

  .si-text {
    font-size: 14px;
    font-weight: 500;
    color: #64748b;
    margin-left: 10px;
    line-height: 1;
    transition: color 0.15s;
    white-space: nowrap;
  }

  .si-badge {
    margin-left: auto;
    background: #dbeafe;
    color: #1d4ed8;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 5px;
    line-height: 1.4;
  }

  .sidebar-footer {
    padding: 12px;
    border-top: 1px solid #f1f5f9;
    position: sticky;
    bottom: 0;
    background: #fff;
    flex-shrink: 0;
  }

  .sidebar-signout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px;
    border-radius: 10px;
    color: #64748b;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    border: 1px solid #e2e8f0;
    background: #fff;
    width: 100%;
    font-family: 'Poppins', sans-serif;
  }

  .sidebar-signout:hover {
    background: #fff1f2;
    color: #e11d48;
    border-color: #fecdd3;
  }

  .sidebar-signout svg {
    width: 17px;
    height: 17px;
    transition: transform 0.2s;
  }

  .sidebar-signout:hover svg {
    transform: translateX(-2px);
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{sidebarStyles}</style>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="sidebar-logo-text">Furniture Admin</span>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-label">Menu</p>

          <div className="sidebar-item active">
            <span className="si-icon"><FiGrid /></span>
            <span className="si-text">Dashboard</span>
          </div>
          <div className="sidebar-item">
            <span className="si-icon"><FiUser /></span>
            <span className="si-text">Profile</span>
          </div>
          <div className="sidebar-item">
            <span className="si-icon"><FiBarChart2 /></span>
            <span className="si-text">Leaderboard</span>
          </div>
          <div className="sidebar-item">
            <span className="si-icon"><FiShoppingCart /></span>
            <span className="si-text">Order</span>
            <span className="si-badge">3</span>
          </div>
          <div className="sidebar-item">
            <span className="si-icon"><FiBox /></span>
            <span className="si-text">Product</span>
          </div>
          <div className="sidebar-item">
            <span className="si-icon"><FiTrendingUp /></span>
            <span className="si-text">Sales Report</span>
          </div>
          <div className="sidebar-item">
            <span className="si-icon"><FiMessageSquare /></span>
            <span className="si-text">Message</span>
          </div>

          <p className="sidebar-label mt">Others</p>

          <div className="sidebar-item">
            <span className="si-icon"><FiSettings /></span>
            <span className="si-text">Settings</span>
          </div>
          <div className="sidebar-item">
            <span className="si-icon"><FiStar /></span>
            <span className="si-text">Favourite</span>
          </div>
          <div className="sidebar-item">
            <span className="si-icon"><FiClock /></span>
            <span className="si-text">History</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-signout" onClick={() => navigate('/login')}>
            <FiLogOut />
            <span>Signout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
