import React, { useMemo, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './features/auth/authSlice';
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/shopkeeper/Dashboard';
import HandlerDashboard from './pages/handler/HandlerDashboard';
import CreateStore from './pages/shopkeeper/CreateStore';
import PublicStore from './pages/store/PublicStore';
import DemoStoresPage from './pages/demoStores/DemoStoresPage';
import StoreDetailsPage from './pages/demoStores/StoreDetailsPage';
import PrivateRoute from './components/common/PrivateRoute';
import RoleRoute from './components/common/RoleRoute';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/layout/Navbar';
import ErrorBoundary from './components/common/ErrorBoundary';

const Layout = () => (
  <ErrorBoundary>
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  </ErrorBoundary>
);

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch, token]);

  const router = useMemo(() => createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
        {
          path: '/demo-stores',
          element: <DemoStoresPage />,
        },
        {
          path: '/demo-store/:slug',
          element: <StoreDetailsPage />,
        },
        {
          path: '/store/:slug',
          element: <PublicStore />,
        },

        // Protected Shopkeeper Routes
        {
          element: <RoleRoute roles={['SHOPKEEPER']} />,
          children: [
            {
              path: '/dashboard',
              element: <Dashboard />,
            },
            {
              path: '/create-store',
              element: <CreateStore />,
            },
          ],
        },
        // Protected Handler Routes
        {
          element: <RoleRoute roles={['HANDLER']} />,
          children: [
            {
              path: '/handler/dashboard',
              element: <HandlerDashboard />,
            },
          ],
        },
        {
          path: '/unauthorized',
          element: <div className="flex items-center justify-center min-h-screen font-bold text-2xl">Unauthorized Access</div>,
        },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        }
      ]
    }
  ]), []);

  return <RouterProvider router={router} />;
}

export default App;


