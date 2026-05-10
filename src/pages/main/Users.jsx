import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronRight } from 'react-icons/fi';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <style>{tableStyles}</style>

      <div style={styles.titleRow}>
        <div>
          <h1 className="admin-page-title">Users</h1>
          <p className="admin-page-subtitle" style={{ margin: 0 }}>
            Daftar pengguna yang terdaftar
          </p>
        </div>

        <div style={styles.searchWrapper}>
          <FiSearch style={styles.searchIcon} size={16} />
          <input
            type="text"
            placeholder="Cari nama, email, atau username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.countBadge}>
        {loading ? 'Memuat data...' : `${filtered.length} user ditemukan`}
      </div>

      {error && (
        <div style={styles.error}>Gagal memuat data: {error}</div>
      )}

      <div style={styles.tableCard}>
        <div style={{ overflowX: 'auto' }}>
          <table className="users-table">
            <thead>
              <tr>
                <th style={{ width: 64 }}>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Age</th>
                <th style={{ width: 48 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading &&
                [...Array(8)].map((_, i) => (
                  <tr key={`sk-${i}`} className="skeleton-row">
                    <td colSpan={7}>
                      <div className="skeleton-bar" />
                    </td>
                  </tr>
                ))}

              {!loading &&
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    <td>
                      <span className="user-id">#{user.id}</span>
                    </td>
                    <td>
                      <div className="user-cell">
                        <img src={user.image} alt={user.firstName} className="user-avatar" />
                        <div className="user-meta">
                          <span className="user-name">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="user-username">@{user.username}</span>
                        </div>
                      </div>
                    </td>
                    <td className="muted">{user.email}</td>
                    <td className="muted">{user.phone}</td>
                    <td>
                      <span className={`gender-badge ${user.gender}`}>
                        {user.gender}
                      </span>
                    </td>
                    <td className="muted">{user.age}</td>
                    <td className="chevron-cell">
                      <FiChevronRight />
                    </td>
                  </tr>
                ))}

              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#9ca3af' }}>
                    Tidak ada user yang cocok dengan pencarian.
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

const styles = {
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '320px',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '10px 14px 10px 40px',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    fontFamily: 'inherit',
  },
  countBadge: {
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#6b7280',
    background: '#fff',
    padding: '8px 14px',
    borderRadius: '10px',
    border: '1px solid #f3f4f6',
    marginBottom: '20px',
  },
  tableCard: {
    background: '#fff',
    borderRadius: '14px',
    border: '1px solid #f3f4f6',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },
  error: {
    background: '#fef2f2',
    color: '#dc2626',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #fecaca',
    marginBottom: '16px',
    fontSize: '14px',
  },
};

const tableStyles = `
  .users-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Poppins', sans-serif;
  }

  .users-table thead th {
    text-align: left;
    font-size: 11px;
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 14px 18px;
    border-bottom: 1px solid #f3f4f6;
    background: #fafafa;
    white-space: nowrap;
  }

  .users-table tbody tr {
    border-bottom: 1px solid #f9fafb;
    transition: background 0.15s;
    cursor: pointer;
  }

  .users-table tbody tr:last-child { border-bottom: none; }

  .users-table tbody tr:hover {
    background: #f9fafb;
  }

  .users-table tbody td {
    padding: 14px 18px;
    font-size: 14px;
    color: #1f2937;
    vertical-align: middle;
  }

  .users-table td.muted { color: #6b7280; }

  .user-id {
    font-weight: 700;
    color: #054C73;
    font-size: 13px;
  }

  .user-cell {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .user-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    background: #f3f4f6;
    flex-shrink: 0;
  }

  .user-meta {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .user-name {
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.3;
  }

  .user-username {
    font-size: 12px;
    color: #054C73;
    font-weight: 500;
  }

  .gender-badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 700;
    text-transform: capitalize;
    letter-spacing: 0.3px;
  }

  .gender-badge.male {
    background: #dbeafe;
    color: #1d4ed8;
  }

  .gender-badge.female {
    background: #fce7f3;
    color: #be185d;
  }

  .chevron-cell {
    color: #d1d5db;
    width: 40px;
  }

  .users-table tbody tr:hover .chevron-cell {
    color: #054C73;
  }

  .skeleton-row td {
    padding: 16px 18px !important;
  }

  .skeleton-bar {
    height: 14px;
    border-radius: 6px;
    background: linear-gradient(110deg, #f3f4f6 30%, #e5e7eb 50%, #f3f4f6 70%);
    background-size: 200% 100%;
    animation: user-shimmer 1.5s infinite;
  }

  @keyframes user-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export default Users;
