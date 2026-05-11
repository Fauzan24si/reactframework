import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDollarSign, FiShoppingBag, FiXCircle, FiClock, FiSearch, FiMoreVertical } from 'react-icons/fi';
import salesData from '../../data/sales.json';

const formatRupiah = (n) =>
  'Rp ' + Number(n).toLocaleString('id-ID');

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

function SalesReport() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const completed = salesData.filter((s) => s.status === 'Completed');
    const processing = salesData.filter((s) => s.status === 'Processing');
    const cancelled = salesData.filter((s) => s.status === 'Cancelled');
    const revenue = completed.reduce((sum, s) => sum + s.total, 0);
    return {
      total: salesData.length,
      completed: completed.length,
      processing: processing.length,
      cancelled: cancelled.length,
      revenue,
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return salesData.filter((s) => {
      const matchSearch =
        !q ||
        s.id.toLowerCase().includes(q) ||
        s.customer.toLowerCase().includes(q) ||
        s.product.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <>
      <style>{componentStyles}</style>

      {/* Summary Cards */}
      <div className="sr-stats">
        <StatCard
          label="Total Revenue"
          value={formatRupiah(stats.revenue)}
          icon={<FiDollarSign />}
          color="revenue"
        />
        <StatCard
          label="Completed"
          value={stats.completed}
          sub={`dari ${stats.total} transaksi`}
          icon={<FiShoppingBag />}
          color="completed"
        />
        <StatCard
          label="Processing"
          value={stats.processing}
          sub="masih berjalan"
          icon={<FiClock />}
          color="processing"
        />
        <StatCard
          label="Cancelled"
          value={stats.cancelled}
          sub="dibatalkan"
          icon={<FiXCircle />}
          color="cancelled"
        />
      </div>

      <div className="table-container">
        {/* Header Section */}
        <div className="table-header-section">
          <div>
            <h1 className="table-main-title">Sales Report</h1>
            <p className="table-sub-title">
              Ringkasan transaksi pembelian toko furniture
            </p>
          </div>
          <button className="btn-download-all-top">Download report</button>
        </div>

        {/* Toolbar Section */}
        <div className="table-search-row custom-toolbar">
          <div className="sr-tabs">
            {['all', 'Completed', 'Processing', 'Cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`sr-tab ${statusFilter === s ? 'active' : ''}`}
              >
                {s === 'all' ? 'Semua' : s}
              </button>
            ))}
          </div>

          <div className="search-wrapper">
            <FiSearch className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Cari invoice, customer, produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', background: '#fff', padding: '0 16px' }}>
          <table className="clean-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Id</th>
                <th>Revenue</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="customer-cell">
                      <img src={`https://ui-avatars.com/api/?name=${row.customer}&background=random&color=fff`} alt={row.customer} className="cust-avatar" />
                      <div className="cust-info">
                        <span className="cust-name">{row.customer}</span>
                        <span className="cust-email">{row.customer.split(' ')[0].toLowerCase()}@gmail.com</span>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray">{row.product}</td>
                  <td className="text-gray">{row.id}</td>
                  <td className="text-gray">{formatRupiah(row.total)}</td>
                  <td>
                    <div className="status-cell">
                      <span className={`status-dot ${row.status.toLowerCase()}`}></span>
                      <span className="status-text">{row.status}</span>
                    </div>
                  </td>
                  <td className="text-gray">{formatDate(row.date)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-state">
                    Tidak ada transaksi yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value, sub, icon, color }) {
  return (
    <div className="sr-stat">
      <div className="sr-stat-info">
        <p className="sr-stat-label">{label}</p>
        <p className="sr-stat-value">{value}</p>
        {sub && <p className="sr-stat-sub">{sub}</p>}
      </div>
      <div className={`sr-stat-icon ${color}`}>{icon}</div>
    </div>
  );
}

const componentStyles = `
  /* Stats */
  .sr-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 28px;
  }
  .sr-stat {
    background: #fff;
    padding: 20px 22px;
    border-radius: 16px;
    border: 1px solid #eaecf0;
    box-shadow: 0 1px 3px rgba(16, 24, 40, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .sr-stat-label {
    font-size: 12px;
    color: #667085;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0 0 6px;
  }
  .sr-stat-value {
    font-size: 22px;
    font-weight: 700;
    color: #101828;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .sr-stat-sub {
    font-size: 12px;
    color: #98a2b3;
    margin: 4px 0 0;
  }
  .sr-stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 20px;
  }
  .sr-stat-icon.revenue     { background: #f0f9ff; color: #0284c7; }
  .sr-stat-icon.completed   { background: #ecfdf5; color: #059669; }
  .sr-stat-icon.processing  { background: #eff6ff; color: #2563eb; }
  .sr-stat-icon.cancelled   { background: #fef2f2; color: #dc2626; }

  /* New Theme Styles for Table */
  .table-container {
    background: #ffffff;
    border: 1px solid #eaecf0;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(16, 24, 40, 0.05);
    overflow: hidden;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .table-header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24px;
    border-bottom: 1px solid #eaecf0;
  }

  .table-main-title {
    font-size: 18px;
    font-weight: 600;
    color: #101828;
    margin: 0 0 4px 0;
  }

  .table-sub-title {
    font-size: 14px;
    color: #667085;
    margin: 0;
  }

  .btn-download-all-top {
    background: #7a5af8;
    color: #ffffff;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-download-all-top:hover {
    background: #6941c6;
  }

  .table-search-row {
    padding: 16px 24px;
    border-bottom: 1px solid #eaecf0;
    background: #fcfcfd;
  }

  .custom-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  /* Toolbar specific styles */
  .sr-tabs {
    display: inline-flex;
    background: #f2f4f7;
    border-radius: 8px;
    padding: 4px;
    gap: 2px;
  }
  .sr-tab {
    padding: 6px 14px;
    background: transparent;
    border: none;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    color: #667085;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .sr-tab:hover { color: #344054; }
  .sr-tab.active {
    background: #ffffff;
    color: #344054;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  }

  .search-wrapper {
    position: relative;
    width: 100%;
    max-width: 320px;
  }
  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #98a2b3;
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    padding: 8px 14px 8px 40px;
    background: #ffffff;
    border: 1px solid #eaecf0;
    border-radius: 6px;
    outline: none;
    font-size: 14px;
    color: #344054;
    transition: border-color 0.15s ease;
  }
  .search-input:focus {
    border-color: #d0d5dd;
  }

  /* Clean Table Styles */
  .clean-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-family: 'Inter', -apple-system, sans-serif;
  }
  .clean-table thead th {
    padding: 16px 24px;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    border-bottom: 1px solid #f3f4f6;
    white-space: nowrap;
  }
  .clean-table tbody tr {
    border-bottom: 1px solid #f9fafb;
    transition: background 0.15s;
  }
  .clean-table tbody tr:hover {
    background: #fcfcfd;
  }
  .clean-table tbody td {
    padding: 16px 24px;
    font-size: 13px;
    color: #4b5563;
    vertical-align: middle;
    white-space: nowrap;
  }

  .customer-cell {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cust-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
  .cust-info {
    display: flex;
    flex-direction: column;
  }
  .cust-name {
    font-weight: 600;
    color: #111827;
    font-size: 13px;
  }
  .cust-email {
    font-size: 12px;
    color: #6b7280;
    margin-top: 2px;
  }

  .status-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .status-dot.completed { background: #6366f1; } /* Blue/Purple */
  .status-dot.processing { background: #06b6d4; } /* Cyan */
  .status-dot.cancelled { background: #ef4444; } /* Red */
  
  .status-text {
    font-size: 13px;
    color: #6b7280;
  }

  /* Typography utilities */
  .text-gray { color: #6b7280 !important; }
  .text-dark { color: #111827 !important; }
  .font-medium { font-weight: 500; }
  .font-bold { font-weight: 600; }
  
  .empty-state {
    text-align: center;
    padding: 40px !important;
    color: #6b7280 !important;
  }

  /* Responsive */
  @media (max-width: 1100px) {
    .sr-stats { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .sr-stats { grid-template-columns: 1fr; }
    .search-wrapper { max-width: 100%; }
  }
`;

export default SalesReport;
