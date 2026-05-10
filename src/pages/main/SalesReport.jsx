import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDollarSign, FiShoppingBag, FiXCircle, FiClock, FiSearch, FiChevronRight } from 'react-icons/fi';
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

      <h1 className="admin-page-title">Sales Report</h1>
      <p className="admin-page-subtitle">Ringkasan transaksi pembelian toko furniture</p>

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

      {/* Toolbar */}
      <div className="sr-toolbar">
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

        <div className="sr-search">
          <FiSearch size={16} />
          <input
            type="text"
            placeholder="Cari invoice, customer, produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="sr-table-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="sr-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Tanggal</th>
                <th>Customer</th>
                <th>Produk</th>
                <th>Kategori</th>
                <th className="num">Qty</th>
                <th className="num">Harga</th>
                <th className="num">Total</th>
                <th>Pembayaran</th>
                <th>Status</th>
                <th style={{ width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} onClick={() => navigate(`/orders/${row.id}`)} className="sr-row-click">
                  <td><span className="sr-invoice">{row.id}</span></td>
                  <td className="muted">{formatDate(row.date)}</td>
                  <td className="sr-customer">{row.customer}</td>
                  <td className="sr-product">{row.product}</td>
                  <td className="muted">{row.category}</td>
                  <td className="num">{row.qty}</td>
                  <td className="num muted">{formatRupiah(row.price)}</td>
                  <td className="num sr-total">{formatRupiah(row.total)}</td>
                  <td className="muted">{row.payment}</td>
                  <td>
                    <span className={`sr-badge ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="sr-chev"><FiChevronRight /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} className="sr-empty">
                    Tidak ada transaksi yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
            {filtered.length > 0 && (
              <tfoot>
                <tr>
                  <td colSpan={7} className="sr-foot-label">
                    Total ({filtered.length} transaksi)
                  </td>
                  <td className="num sr-foot-total">
                    {formatRupiah(filtered.reduce((sum, r) => sum + r.total, 0))}
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            )}
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
    border: 1px solid #f3f4f6;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .sr-stat-label {
    font-size: 12px;
    color: #9ca3af;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin: 0 0 6px;
  }
  .sr-stat-value {
    font-size: 22px;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .sr-stat-sub {
    font-size: 12px;
    color: #9ca3af;
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
  .sr-stat-icon.revenue     { background: #DFE9F4; color: #054C73; }
  .sr-stat-icon.completed   { background: #dcfce7; color: #16a34a; }
  .sr-stat-icon.processing  { background: #dbeafe; color: #1d4ed8; }
  .sr-stat-icon.cancelled   { background: #fee2e2; color: #dc2626; }

  /* Toolbar */
  .sr-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .sr-tabs {
    display: inline-flex;
    background: #fff;
    border: 1px solid #f3f4f6;
    border-radius: 10px;
    padding: 4px;
    gap: 2px;
  }
  .sr-tab {
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.15s ease;
    font-family: 'Poppins', sans-serif;
  }
  .sr-tab:hover { color: #1f2937; }
  .sr-tab.active {
    background: #054C73;
    color: #fff;
  }

  .sr-search {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 0 14px;
    min-width: 280px;
    color: #9ca3af;
  }
  .sr-search input {
    flex: 1;
    padding: 10px 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 13px;
    color: #374151;
    font-family: 'Poppins', sans-serif;
  }

  /* Table */
  .sr-table-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #f3f4f6;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    overflow: hidden;
  }
  .sr-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .sr-table thead th {
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 14px 16px;
    background: #fafafa;
    border-bottom: 1px solid #f3f4f6;
    white-space: nowrap;
  }
  .sr-table th.num, .sr-table td.num { text-align: right; }

  .sr-table tbody tr {
    border-bottom: 1px solid #f9fafb;
    transition: background 0.15s;
  }
  .sr-table tbody tr:last-child { border-bottom: none; }
  .sr-table tbody tr:hover { background: #f9fafb; }
  .sr-table tbody tr.sr-row-click { cursor: pointer; }
  .sr-table tbody tr.sr-row-click:hover .sr-invoice { text-decoration: underline; }
  .sr-chev { color: #d1d5db; text-align: right; padding-right: 16px !important; }
  .sr-table tbody tr:hover .sr-chev { color: #054C73; }

  .sr-table tbody td {
    padding: 14px 16px;
    color: #1f2937;
    white-space: nowrap;
    vertical-align: middle;
  }
  .sr-table td.muted { color: #6b7280; }

  .sr-invoice {
    font-weight: 700;
    color: #054C73;
    font-size: 12.5px;
  }
  .sr-customer { font-weight: 600; }
  .sr-product { color: #374151; }
  .sr-total { font-weight: 700; color: #1f2937; }

  .sr-badge {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }
  .sr-badge.completed  { background: #dcfce7; color: #15803d; }
  .sr-badge.processing { background: #dbeafe; color: #1d4ed8; }
  .sr-badge.cancelled  { background: #fee2e2; color: #dc2626; }

  .sr-empty {
    text-align: center;
    padding: 32px;
    color: #9ca3af;
    font-size: 14px;
  }

  .sr-table tfoot td {
    padding: 14px 16px;
    background: #fafafa;
    border-top: 2px solid #f3f4f6;
    font-size: 13px;
  }
  .sr-foot-label {
    text-align: right;
    font-weight: 600;
    color: #6b7280;
  }
  .sr-foot-total {
    font-weight: 800;
    color: #054C73;
    font-size: 14px;
  }

  /* Responsive */
  @media (max-width: 1100px) {
    .sr-stats { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .sr-stats { grid-template-columns: 1fr; }
    .sr-search { min-width: 100%; }
  }
`;

export default SalesReport;
