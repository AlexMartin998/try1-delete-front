import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  if (cargando)
    return (
      <p className="text-3xl my-auto text-green-900 font-black">
        Loading... PRIVATE
      </p>
    );

  return (
    <>
      {auth?._id ? (
        <>
          <Header />

          <main className="container mx-auto mt-10">
            <Outlet />
          </main>

          <Footer />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
