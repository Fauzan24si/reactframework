import { useParams } from 'react-router-dom';

function UserDetail() {
  const { abc } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            User Detail
          </h1>
          <div className="border-t pt-4">
            <p className="text-lg text-gray-600">
              User ID: <span className="font-semibold text-green-600">{abc}</span>
            </p>
            <div className="mt-6 space-y-3">
              <p className="text-gray-700">Username: user_{abc}</p>
              <p className="text-gray-700">Email: {abc}@example.com</p>
              <p className="text-gray-700">Role: Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
