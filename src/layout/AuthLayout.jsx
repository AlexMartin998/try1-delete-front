import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthLayout = () => {
  const { auth } = useAuth();
  // console.log(auth);

  // Public Routes
  return (
    <>
      {!auth?._id ? (
        <main className="container mx-auto md:grid  md:grid-cols-2 mt-12 gap-12 p-5 items-center">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/admin" replace />
      )}
    </>
  );
};

export default AuthLayout;
