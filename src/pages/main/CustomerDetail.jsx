import { useParams } from 'react-router-dom';

function CustomerDetail() {
  const { id } = useParams();

  return (
    <>
      <h1 className="admin-page-title">Customer Detail</h1>
      <p className="admin-page-subtitle">Informasi detail customer</p>

      <div style={styles.card}>
        <p style={styles.idRow}>
          Customer ID: <span style={{ color: '#054C73', fontWeight: 700 }}>{id}</span>
        </p>
        <div style={styles.list}>
          <p style={styles.item}>Nama: Customer {id}</p>
          <p style={styles.item}>Email: customer{id}@example.com</p>
          <p style={styles.item}>Status: Active</p>
        </div>
      </div>
    </>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f3f4f6',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    padding: '28px',
  },
  idRow: { fontSize: '16px', color: '#6b7280', margin: '0 0 20px', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' },
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  item: { fontSize: '14px', color: '#374151', margin: 0 },
};

export default CustomerDetail;
