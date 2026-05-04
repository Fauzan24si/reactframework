import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from './components/Loading';

// Lazy load pages
const Home = React.lazy(() => import('./pages/main/Home'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Dashboard = React.lazy(() => import('./pages/main/Dashboard'));
const CustomerDetail = React.lazy(() => import('./pages/main/CustomerDetail'));
const UserDetail = React.lazy(() => import('./pages/main/UserDetail'));
const Produk = React.lazy(() => import('./pages/main/Produk'));
const ProductDetail = React.lazy(() => import('./pages/main/ProductDetail'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/admin/dashboard" element={<Dashboard />} />
          
          {/* Dynamic Routes */}
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/users/:abc" element={<UserDetail />} />
          <Route path="/products" element={<Produk />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
