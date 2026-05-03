import React from 'react';
import Sidebar from '../../components/Sidebar';
import { FiSearch, FiBell, FiMoreVertical, FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';

const dashboardStyles = `
  .dashboard-root {
    display: flex;
    height: 100vh;
    background: #F4F5F7;
    font-family: 'Poppins', sans-serif;
  }

  .dashboard-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
  }

  /* Top Header */
  .dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
    flex-shrink: 0;
  }

  .search-box {
    display: flex;
    align-items: center;
    background: #F4F5F7;
    border-radius: 10px;
    padding: 10px 16px;
    width: 360px;
    border: 1px solid #e5e7eb;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-box:focus-within {
    border-color: #054C73;
    box-shadow: 0 0 0 2px rgba(5, 76, 115, 0.1);
  }

  .search-box input {
    background: transparent;
    border: none;
    outline: none;
    margin-left: 12px;
    width: 100%;
    font-size: 14px;
    color: #374151;
    font-family: 'Poppins', sans-serif;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .notification-btn {
    position: relative;
    padding: 8px;
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.2s;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .notification-btn:hover {
    color: #054C73;
  }

  .notification-dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 9px;
    height: 9px;
    background: #ef4444;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .admin-profile {
    display: flex;
    align-items: center;
    gap: 12px;
    border-left: 1px solid #e5e7eb;
    padding-left: 24px;
    cursor: pointer;
  }

  .admin-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .admin-name {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    margin: 0;
  }

  .admin-role {
    font-size: 12px;
    color: #6b7280;
    margin: 0;
  }

  /* Content area */
  .dashboard-content {
    flex: 1;
    overflow-y: auto;
    padding: 32px;
  }

  .dashboard-title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 4px 0;
  }

  .dashboard-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 32px 0;
  }

  /* Stats Cards Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: #fff;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #f3f4f6;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  }

  .stat-info {}

  .stat-label {
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
    margin: 0 0 6px 0;
  }

  .stat-value {
    font-size: 26px;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 8px 0;
  }

  .stat-change {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    gap: 4px;
  }

  .stat-change.positive { color: #22c55e; }
  .stat-change.negative { color: #ef4444; }

  .stat-change span.muted {
    color: #9ca3af;
    font-weight: 400;
  }

  .stat-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 22px;
    transition: transform 0.3s;
  }

  .stat-card:hover .stat-icon {
    transform: scale(1.1);
  }

  .stat-icon.revenue { background: #DFE9F4; color: #054C73; }
  .stat-icon.orders { background: rgba(184, 142, 47, 0.15); color: #B88E2F; }
  .stat-icon.customers { background: #dbeafe; color: #2563eb; }
  .stat-icon.conversion { background: #dcfce7; color: #16a34a; }

  /* Bottom Grid */
  .bottom-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 32px;
  }

  /* Card */
  .card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #f3f4f6;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    padding: 24px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }

  .view-all-btn {
    font-size: 13px;
    color: #054C73;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    transition: opacity 0.2s;
  }

  .view-all-btn:hover {
    opacity: 0.7;
    text-decoration: underline;
  }

  .more-btn {
    padding: 4px;
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    border-radius: 6px;
    transition: background 0.2s;
    display: flex;
    align-items: center;
  }

  .more-btn:hover {
    background: #f3f4f6;
  }

  /* Table */
  .orders-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  .orders-table thead th {
    font-size: 12px;
    font-weight: 600;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f3f4f6;
  }

  .orders-table tbody tr {
    border-bottom: 1px solid #f9fafb;
    transition: background 0.15s;
    cursor: pointer;
  }

  .orders-table tbody tr:hover {
    background: #f9fafb;
  }

  .orders-table tbody td {
    padding: 14px 0;
    font-size: 14px;
  }

  .orders-table .order-id {
    font-weight: 600;
    color: #1f2937;
  }

  .orders-table tbody tr:hover .order-id {
    color: #054C73;
  }

  .orders-table .customer-name {
    color: #4b5563;
  }

  .orders-table .order-date {
    color: #6b7280;
  }

  .orders-table .order-amount {
    font-weight: 600;
    color: #1f2937;
  }

  .status-badge {
    display: inline-block;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .status-badge.completed { background: #dcfce7; color: #15803d; }
  .status-badge.processing { background: #dbeafe; color: #1d4ed8; }
  .status-badge.cancelled { background: #fee2e2; color: #dc2626; }

  /* Product Row */
  .product-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px;
    margin: 0 -10px;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .product-row:hover {
    background: #f9fafb;
  }

  .product-row + .product-row {
    margin-top: 8px;
  }

  .product-img {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    object-fit: cover;
    flex-shrink: 0;
    background: #f3f4f6;
    transition: transform 0.3s;
  }

  .product-row:hover .product-img {
    transform: scale(1.08);
  }

  .product-info {
    flex: 1;
    min-width: 0;
  }

  .product-name {
    font-size: 14px;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.15s;
  }

  .product-row:hover .product-name {
    color: #054C73;
  }

  .product-category {
    font-size: 12px;
    color: #6b7280;
    margin: 2px 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-price {
    text-align: right;
    flex-shrink: 0;
  }

  .product-price p:first-child {
    font-size: 14px;
    font-weight: 700;
    color: #054C73;
    margin: 0;
  }

  .product-price p:last-child {
    font-size: 11px;
    color: #9ca3af;
    margin: 2px 0 0;
  }

  /* Responsive */
  @media (max-width: 1200px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .bottom-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    .dashboard-content {
      padding: 20px;
    }
    .search-box {
      width: 200px;
    }
  }
`;

const Dashboard = () => {
  return (
    <>
      <style>{dashboardStyles}</style>
      <div className="dashboard-root">
        <Sidebar />

        <div className="dashboard-main">
          {/* Top Header */}
          <header className="dashboard-header">
            <div className="search-box">
              <FiSearch style={{ color: '#9ca3af', fontSize: 18, flexShrink: 0 }} />
              <input type="text" placeholder="Search anything here..." />
            </div>

            <div className="header-right">
              <button className="notification-btn">
                <FiBell />
                <span className="notification-dot"></span>
              </button>
              <div className="admin-profile">
                <img
                  src="https://ui-avatars.com/api/?name=Admin+User&background=054C73&color=fff"
                  alt="Admin"
                  className="admin-avatar"
                />
                <div>
                  <p className="admin-name">Admin User</p>
                  <p className="admin-role">Super Admin</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="dashboard-content">
            <h1 className="dashboard-title">Dashboard Overview</h1>
            <p className="dashboard-subtitle">Welcome back, here's what's happening with your store today.</p>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-info">
                  <p className="stat-label">Total Revenue</p>
                  <p className="stat-value">$24,560</p>
                  <div className="stat-change positive">
                    <span>+12.5%</span>
                    <span className="muted">vs last month</span>
                  </div>
                </div>
                <div className="stat-icon revenue">
                  <FiDollarSign />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <p className="stat-label">Total Orders</p>
                  <p className="stat-value">1,245</p>
                  <div className="stat-change positive">
                    <span>+8.2%</span>
                    <span className="muted">vs last month</span>
                  </div>
                </div>
                <div className="stat-icon orders">
                  <FiShoppingBag />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <p className="stat-label">Total Customers</p>
                  <p className="stat-value">842</p>
                  <div className="stat-change negative">
                    <span>-2.4%</span>
                    <span className="muted">vs last month</span>
                  </div>
                </div>
                <div className="stat-icon customers">
                  <FiUsers />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <p className="stat-label">Conversion Rate</p>
                  <p className="stat-value">4.5%</p>
                  <div className="stat-change positive">
                    <span>+1.2%</span>
                    <span className="muted">vs last month</span>
                  </div>
                </div>
                <div className="stat-icon conversion">
                  <FiTrendingUp />
                </div>
              </div>
            </div>

            {/* Recent Orders & Top Products */}
            <div className="bottom-grid">
              {/* Recent Orders */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Recent Orders</h2>
                  <button className="view-all-btn">View All</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="order-id">#ORD-001</td>
                        <td className="customer-name">John Doe</td>
                        <td className="order-date">Oct 24, 2023</td>
                        <td className="order-amount">$120.00</td>
                        <td><span className="status-badge completed">Completed</span></td>
                      </tr>
                      <tr>
                        <td className="order-id">#ORD-002</td>
                        <td className="customer-name">Jane Smith</td>
                        <td className="order-date">Oct 23, 2023</td>
                        <td className="order-amount">$450.00</td>
                        <td><span className="status-badge processing">Processing</span></td>
                      </tr>
                      <tr>
                        <td className="order-id">#ORD-003</td>
                        <td className="customer-name">Michael Johnson</td>
                        <td className="order-date">Oct 23, 2023</td>
                        <td className="order-amount">$89.50</td>
                        <td><span className="status-badge completed">Completed</span></td>
                      </tr>
                      <tr>
                        <td className="order-id">#ORD-004</td>
                        <td className="customer-name">Emily Davis</td>
                        <td className="order-date">Oct 22, 2023</td>
                        <td className="order-amount">$210.00</td>
                        <td><span className="status-badge cancelled">Cancelled</span></td>
                      </tr>
                      <tr>
                        <td className="order-id">#ORD-005</td>
                        <td className="customer-name">William Brown</td>
                        <td className="order-date">Oct 21, 2023</td>
                        <td className="order-amount">$55.00</td>
                        <td><span className="status-badge completed">Completed</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Products */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Top Products</h2>
                  <button className="more-btn">
                    <FiMoreVertical />
                  </button>
                </div>
                <div>
                  <div className="product-row">
                    <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&q=80" alt="Syltherine" className="product-img" />
                    <div className="product-info">
                      <p className="product-name">Syltherine</p>
                      <p className="product-category">Stylish cafe chair</p>
                    </div>
                    <div className="product-price">
                      <p>$2.500.000</p>
                      <p>124 sales</p>
                    </div>
                  </div>

                  <div className="product-row">
                    <img src="https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=150&q=80" alt="Leviosa" className="product-img" />
                    <div className="product-info">
                      <p className="product-name">Leviosa</p>
                      <p className="product-category">Stylish cafe chair</p>
                    </div>
                    <div className="product-price">
                      <p>$2.500.000</p>
                      <p>98 sales</p>
                    </div>
                  </div>

                  <div className="product-row">
                    <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=150&q=80" alt="Lolito" className="product-img" />
                    <div className="product-info">
                      <p className="product-name">Lolito</p>
                      <p className="product-category">Luxury big sofa</p>
                    </div>
                    <div className="product-price">
                      <p>$7.000.000</p>
                      <p>74 sales</p>
                    </div>
                  </div>

                  <div className="product-row">
                    <img src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=150&q=80" alt="Respira" className="product-img" />
                    <div className="product-info">
                      <p className="product-name">Respira</p>
                      <p className="product-category">Outdoor bar table and stool</p>
                    </div>
                    <div className="product-price">
                      <p>$5.000.000</p>
                      <p>52 sales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
