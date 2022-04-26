import { useState, useEffect } from 'react';

import Formulario from '../components/Formulario';
import ListadoPacientes from '../components/ListadoPacientes';
import clienteAxios from '../config/axios';
import usePacientes from '../hooks/usePacientes';

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
const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  // const { setPatients } = usePacientes();

  // useEffect(() => {
  //   console.log('Admin patients');

  //   const obtenerPacientes = async () => {
  //     try {
  //       const config = validateTokenFromLS();
  //       if (!config) return;

  //       const { data } = await clienteAxios('/pacientes', config);
  //       setPatients(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   obtenerPacientes();
  // }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
      </button>

      <div
        className={`${
          mostrarFormulario ? 'block' : 'hidden'
        } md:block md:w-1/2 lg:w-2/5 `}
      >
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdministrarPacientes;
