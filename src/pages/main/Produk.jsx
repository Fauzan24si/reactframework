import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiSearch, FiShoppingCart, FiStar } from 'react-icons/fi';

function Produk() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products?limit=30')
      .then((response) => {
        if (response.status !== 200) {
          setError(response.message);
          return;
        }
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div style={styles.errorCard}>
        <div style={styles.errorIcon}>
          <span style={{ fontSize: '32px', fontWeight: 900 }}>!</span>
        </div>
        <h2 style={styles.errorTitle}>Terjadi Kesalahan</h2>
        <p style={styles.errorMessage}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={styles.errorButton}
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Page title selaras dengan halaman admin lain */}
      <div style={styles.titleRow}>
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-subtitle" style={{ margin: 0 }}>
            Kelola katalog produk toko furniture kamu
          </p>
        </div>

        <div style={styles.searchWrapper}>
          <FiSearch style={styles.searchIcon} size={16} />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={styles.countBadge}>
        {loading ? 'Menyiapkan katalog...' : `Menampilkan ${filteredProducts.length} produk`}
      </div>

      {loading ? (
        <div className="produk-grid" style={styles.grid}>
          {[...Array(8)].map((_, index) => (
            <div key={index} style={styles.skeletonCard}>
              <div style={styles.skeletonImage} />
              <div style={styles.skeletonContent}>
                <div style={{ ...styles.skeletonLine, width: '40%', height: '12px' }} />
                <div style={{ ...styles.skeletonLine, width: '80%', height: '16px' }} />
                <div style={{ ...styles.skeletonLine, width: '60%', height: '14px' }} />
                <div style={styles.skeletonFooter}>
                  <div style={{ ...styles.skeletonLine, width: '35%', height: '20px' }} />
                  <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '10px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="produk-grid" style={styles.grid}>
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            <FiSearch size={40} />
          </div>
          <h3 style={styles.emptyTitle}>Produk tidak ditemukan</h3>
          <p style={styles.emptyText}>
            Maaf, kami tidak dapat menemukan produk yang sesuai dengan pencarian Anda.
          </p>
          <button
            onClick={() => setSearchTerm('')}
            style={styles.emptyButton}
          >
            Hapus Pencarian
          </button>
        </div>
      )}
    </>
  );
}

/* ─── Product Card Component ─── */
function ProductCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/products/${item.id}`}
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={styles.imageContainer}>
        <span style={styles.categoryBadge}>
          {item.category.replace('-', ' ')}
        </span>
        <span style={styles.ratingBadge}>
          <FiStar style={{ color: '#f59e0b', fill: '#f59e0b' }} size={12} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#374151' }}>{item.rating}</span>
        </span>
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{
            ...styles.productImage,
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div style={styles.cardContent}>
        <span style={styles.brandLabel}>
          {item.brand || 'Premium Brand'}
        </span>

        <h3 style={{
          ...styles.productTitle,
          color: hovered ? '#054C73' : '#111827',
        }}>
          {item.title}
        </h3>

        <p style={styles.productDesc}>
          {item.description}
        </p>

        <div style={styles.priceRow}>
          <div style={styles.priceCol}>
            <span style={{
              ...styles.currentPrice,
              color: hovered ? '#054C73' : '#111827',
            }}>
              Rp {(item.price * 15000).toLocaleString('id-ID')}
            </span>
          </div>

          <button
            style={{
              ...styles.cartButton,
              background: hovered ? '#054C73' : '#f9fafb',
              color: hovered ? '#fff' : '#6b7280',
              borderColor: hovered ? '#054C73' : '#e5e7eb',
              boxShadow: hovered ? '0 4px 12px rgba(5,76,115,0.25)' : 'none',
            }}
            onClick={(e) => e.preventDefault()}
          >
            <FiShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}

/* ─── Styles (khusus konten, tidak ada page shell) ─── */
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

  /* Grid */
  grid: {
    display: 'grid',
    gap: '20px',
  },

  /* Card — selaras warna admin (#054C73) */
  card: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #f3f4f6',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  cardHover: {
    borderColor: '#DFE9F4',
    boxShadow: '0 12px 28px rgba(5,76,115,0.1)',
    transform: 'translateY(-3px)',
  },

  imageContainer: {
    position: 'relative',
    height: '200px',
    background: 'linear-gradient(135deg, #f9fafb, #f3f4f6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transition: 'transform 0.6s ease',
  },
  categoryBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 2,
    background: 'rgba(255,255,255,0.95)',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: 700,
    color: '#6b7280',
    textTransform: 'capitalize',
    letterSpacing: '0.04em',
  },
  ratingBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'rgba(255,255,255,0.95)',
    padding: '4px 8px',
    borderRadius: '20px',
  },

  cardContent: {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  brandLabel: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '4px',
  },
  productTitle: {
    fontSize: '15px',
    fontWeight: 700,
    lineHeight: 1.3,
    margin: '0 0 8px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    transition: 'color 0.25s ease',
  },
  productDesc: {
    fontSize: '12.5px',
    color: '#9ca3af',
    lineHeight: 1.5,
    margin: '0 0 16px 0',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    flexGrow: 1,
  },

  priceRow: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderTop: '1px solid #f3f4f6',
    paddingTop: '14px',
    marginTop: 'auto',
  },
  priceCol: { display: 'flex', flexDirection: 'column' },
  currentPrice: {
    fontSize: '16px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    transition: 'color 0.25s ease',
  },
  cartButton: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    flexShrink: 0,
  },

  /* Skeleton */
  skeletonCard: {
    background: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #f3f4f6',
  },
  skeletonImage: {
    width: '100%',
    height: '200px',
    background: 'linear-gradient(110deg, #f3f4f6 30%, #e5e7eb 50%, #f3f4f6 70%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
  skeletonContent: {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  skeletonLine: {
    height: '14px',
    background: '#f3f4f6',
    borderRadius: '6px',
  },
  skeletonFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12px',
    paddingTop: '14px',
    borderTop: '1px solid #f3f4f6',
  },

  /* Error */
  errorCard: {
    background: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    textAlign: 'center',
    maxWidth: '400px',
    margin: '40px auto',
    border: '1px solid #f3f4f6',
  },
  errorIcon: {
    width: '64px',
    height: '64px',
    background: '#fef2f2',
    color: '#ef4444',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  errorTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px',
  },
  errorMessage: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: '0 0 24px',
  },
  errorButton: {
    padding: '12px 28px',
    background: '#054C73',
    color: '#fff',
    fontWeight: 600,
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'inherit',
  },

  /* Empty State */
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 16px',
    textAlign: 'center',
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f3f4f6',
  },
  emptyIcon: {
    width: '80px',
    height: '80px',
    background: '#f3f4f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#d1d5db',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#9ca3af',
    maxWidth: '400px',
    margin: '0 0 24px',
  },
  emptyButton: {
    padding: '10px 24px',
    background: '#DFE9F4',
    color: '#054C73',
    fontWeight: 700,
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'inherit',
  },
};

/* Shimmer + responsive grid */
if (typeof document !== 'undefined' && !document.querySelector('[data-produk-styles]')) {
  const styleSheet = document.createElement('style');
  styleSheet.setAttribute('data-produk-styles', '');
  styleSheet.textContent = `
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    .produk-grid { grid-template-columns: repeat(4, 1fr); }
    @media (max-width: 1200px) { .produk-grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 900px)  { .produk-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px)  { .produk-grid { grid-template-columns: 1fr; } }
  `;
  document.head.appendChild(styleSheet);
}

export default Produk;
