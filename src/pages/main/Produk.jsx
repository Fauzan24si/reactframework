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
      <div style={styles.errorWrapper}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>
            <span style={{ fontSize: '32px', fontWeight: 900 }}>!</span>
          </div>
          <h2 style={styles.errorTitle}>Terjadi Kesalahan</h2>
          <p style={styles.errorMessage}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={styles.errorButton}
            onMouseEnter={(e) => {
              e.target.style.background = '#1a1a1a';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#111';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerContent}>
            <div>
              <h1 style={styles.pageTitle}>
                Koleksi <span style={{ color: '#10b981' }}>Eksklusif</span>
              </h1>
              <p style={styles.pageSubtitle}>Temukan produk terbaik pilihan kami</p>
            </div>

            <div style={styles.searchWrapper}>
              <FiSearch style={styles.searchIcon} size={18} />
              <input
                type="text"
                placeholder="Cari produk impian Anda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
                onFocus={(e) => {
                  e.target.style.borderColor = '#10b981';
                  e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContainer}>
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
              onMouseEnter={(e) => {
                e.target.style.background = '#d1fae5';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ecfdf5';
              }}
            >
              Hapus Pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Product Card Component ─── */
function ProductCard({ item }) {
  const [hovered, setHovered] = useState(false);

  const discountedOriginalPrice = item.discountPercentage > 0
    ? ((item.price / (1 - item.discountPercentage / 100)) * 15000).toLocaleString('id-ID', { maximumFractionDigits: 0 })
    : null;

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
      {/* Image Container — fixed height for consistency */}
      <div style={styles.imageContainer}>
        {/* Category Badge */}
        <span style={styles.categoryBadge}>
          {item.category.replace('-', ' ')}
        </span>

        {/* Rating Badge */}
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

      {/* Content — flex grow to fill remaining space */}
      <div style={styles.cardContent}>
        <span style={styles.brandLabel}>
          {item.brand || 'Premium Brand'}
        </span>

        <h3 style={{
          ...styles.productTitle,
          color: hovered ? '#10b981' : '#111827',
        }}>
          {item.title}
        </h3>

        <p style={styles.productDesc}>
          {item.description}
        </p>

        {/* Price Row — pinned to bottom */}
        <div style={styles.priceRow}>
          <div style={styles.priceCol}>
            {discountedOriginalPrice && (
              <span style={styles.originalPrice}>
                Rp {discountedOriginalPrice}
              </span>
            )}
            <span style={{
              ...styles.currentPrice,
              color: hovered ? '#10b981' : '#111827',
            }}>
              Rp {(item.price * 15000).toLocaleString('id-ID')}
            </span>
          </div>

          <button
            style={{
              ...styles.cartButton,
              background: hovered ? '#10b981' : '#f9fafb',
              color: hovered ? '#fff' : '#6b7280',
              borderColor: hovered ? '#10b981' : '#e5e7eb',
              boxShadow: hovered ? '0 4px 12px rgba(16,185,129,0.3)' : 'none',
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

/* ─── Styles ─── */
const styles = {
  /* Page */
  pageWrapper: {
    minHeight: '100vh',
    background: '#f8f9fa',
    fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
    paddingBottom: '80px',
  },

  /* Header */
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    borderBottom: '1px solid rgba(229,231,235,0.5)',
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  },
  headerInner: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '16px 24px',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  pageTitle: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#111827',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  pageSubtitle: {
    fontSize: '13px',
    color: '#9ca3af',
    marginTop: '2px',
    fontWeight: 500,
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '380px',
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
    padding: '11px 16px 11px 42px',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    outline: 'none',
    fontSize: '14px',
    fontWeight: 500,
    color: '#374151',
    transition: 'all 0.25s ease',
    fontFamily: 'inherit',
  },

  /* Main */
  mainContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 24px 0',
  },
  countBadge: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#6b7280',
    background: '#fff',
    padding: '8px 16px',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #f3f4f6',
    marginBottom: '24px',
  },

  /* Grid */
  grid: {
    display: 'grid',
    gap: '24px',
  },

  /* Card */
  card: {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid #f3f4f6',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    cursor: 'pointer',
  },
  cardHover: {
    borderColor: '#a7f3d0',
    boxShadow: '0 20px 40px -12px rgba(16,185,129,0.12)',
    transform: 'translateY(-4px)',
  },

  /* Image */
  imageContainer: {
    position: 'relative',
    height: '220px',
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
    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  categoryBadge: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    zIndex: 2,
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(8px)',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: 700,
    color: '#6b7280',
    textTransform: 'capitalize',
    letterSpacing: '0.04em',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  ratingBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(8px)',
    padding: '4px 8px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.3)',
  },

  /* Content */
  cardContent: {
    padding: '20px',
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
    transition: 'color 0.3s ease',
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

  /* Price Row */
  priceRow: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderTop: '1px solid #f3f4f6',
    paddingTop: '16px',
    marginTop: 'auto',
  },
  priceCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  originalPrice: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#ef4444',
    textDecoration: 'line-through',
    marginBottom: '2px',
  },
  currentPrice: {
    fontSize: '17px',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    transition: 'color 0.3s ease',
  },
  cartButton: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flexShrink: 0,
  },

  /* Skeleton */
  skeletonCard: {
    background: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid #f3f4f6',
  },
  skeletonImage: {
    width: '100%',
    height: '220px',
    background: 'linear-gradient(110deg, #f3f4f6 30%, #e5e7eb 50%, #f3f4f6 70%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
  skeletonContent: {
    padding: '20px',
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
    paddingTop: '16px',
    borderTop: '1px solid #f3f4f6',
  },

  /* Error */
  errorWrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa',
    padding: '16px',
  },
  errorCard: {
    background: '#fff',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    border: '1px solid #fef2f2',
  },
  errorIcon: {
    width: '72px',
    height: '72px',
    background: '#fef2f2',
    color: '#ef4444',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  errorTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px',
  },
  errorMessage: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: '0 0 28px',
  },
  errorButton: {
    width: '100%',
    padding: '14px',
    background: '#111',
    color: '#fff',
    fontWeight: 600,
    borderRadius: '14px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },

  /* Empty State */
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 16px',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '88px',
    height: '88px',
    background: '#f3f4f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#d1d5db',
    marginBottom: '24px',
  },
  emptyTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 8px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#9ca3af',
    maxWidth: '400px',
    margin: '0 0 28px',
  },
  emptyButton: {
    padding: '12px 28px',
    background: '#ecfdf5',
    color: '#059669',
    fontWeight: 700,
    borderRadius: '14px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
  },
};

/* Inject responsive CSS + shimmer animation */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .produk-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1200px) {
    .produk-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 768px) {
    .produk-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    .produk-grid { grid-template-columns: 1fr; }
  }
`;
if (!document.querySelector('[data-produk-styles]')) {
  styleSheet.setAttribute('data-produk-styles', '');
  document.head.appendChild(styleSheet);
}

export default Produk;
