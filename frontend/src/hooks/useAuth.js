import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, token, role, isLoading } = useSelector((state) => state.auth);
  
  return {
    isAuthenticated: !!token,
    user,
    role,
    isLoading,
    isShopkeeper: role === 'SHOPKEEPER',
    isHandler: role === 'HANDLER'
  };
};
