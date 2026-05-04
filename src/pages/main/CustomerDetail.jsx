import { useParams } from 'react-router-dom';

function CustomerDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Customer Detail
          </h1>
          <div className="border-t pt-4">
            <p className="text-lg text-gray-600">
              Customer ID: <span className="font-semibold text-blue-600">{id}</span>
            </p>
            <div className="mt-6 space-y-3">
              <p className="text-gray-700">Nama: Customer {id}</p>
              <p className="text-gray-700">Email: customer{id}@example.com</p>
              <p className="text-gray-700">Status: Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
