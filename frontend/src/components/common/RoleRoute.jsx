import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RoleRoute = ({ roles }) => {
  console.log('RoleRoute rendering with roles:', roles);
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    console.log('No role found, navigating to login');
    return <Navigate to="/login" replace />;
  }
  
  const hasAccess = roles.includes(role);
  console.log('User role:', role, 'Has access:', hasAccess);

  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default RoleRoute;

