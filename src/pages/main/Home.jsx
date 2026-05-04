import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Inspiration from '../../components/Inspiration';
import BeautifySpace from '../../components/BeautifySpace';
import BrowseRange from '../../components/BrowseRange';
import HowItWorks from '../../components/HowItWorks';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <Inspiration />
      <BeautifySpace />
      <BrowseRange />
      <HowItWorks />
      
      {/* Demo Dynamic Routes */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Demo Dynamic Routes</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Customer Details</h3>
              <div className="space-y-2">
                <Link to="/customers/1" className="block text-blue-500 hover:underline">→ Customer ID: 1</Link>
                <Link to="/customers/2" className="block text-blue-500 hover:underline">→ Customer ID: 2</Link>
                <Link to="/customers/99" className="block text-blue-500 hover:underline">→ Customer ID: 99</Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-600">User Details</h3>
              <div className="space-y-2">
                <Link to="/users/abc123" className="block text-green-500 hover:underline">→ User ID: abc123</Link>
                <Link to="/users/xyz789" className="block text-green-500 hover:underline">→ User ID: xyz789</Link>
                <Link to="/users/test456" className="block text-green-500 hover:underline">→ User ID: test456</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
