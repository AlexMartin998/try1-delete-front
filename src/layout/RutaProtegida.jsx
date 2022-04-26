import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios';
import usePacientes from '../hooks/usePacientes';
import { useEffect } from 'react';

const validateTokenFromLS = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  const { setPatients } = usePacientes();

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const config = validateTokenFromLS();
        if (!config) return;

        const { data } = await clienteAxios('/pacientes', config);
        setPatients(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, []);

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
