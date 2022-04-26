import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const PublicRoute = ({ children }) => {
  const { auth } = useAuth();

  // return !uid._id ? children : <Navigate to="/admin" />;
  return !uid ? children : <Navigate to="/" />;

  // {!auth?.uid ? <Outlet /> : <Navigate to="/admin" replace />}
};

// juan1@juan.com
