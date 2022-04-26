import { createContext, useState, useEffect, useCallback } from 'react';
import clienteAxios from '../config/axios';

const PacientesContext = createContext();

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

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  const setPatients = useCallback(
    apiData => {
      setPacientes(apiData);
    },
    [setPacientes]
  );

  const guardarPaciente = async paciente => {
    const config = validateTokenFromLS();
    if (!config) return;

    if (paciente.id) {
      try {
        console.log('P4');

        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );

        const pacientesActualizado = pacientes.map(pacienteState =>
          pacienteState._id === data._id ? data : pacienteState
        );
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('P3');
      const config = validateTokenFromLS();
      if (!config) return;

      try {
        const { data } = await clienteAxios.post(
          '/pacientes',
          paciente,
          config
        );
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const setEdicion = paciente => {
    const config = validateTokenFromLS();
    if (!config) return;

    setPaciente(paciente);
  };

  const eliminarPaciente = async id => {
    const confirmar = confirm('¿Confirmas que deseas eliminar ?');

    if (confirmar) {
      try {
        const config = validateTokenFromLS();
        if (!config) return;

        await clienteAxios.delete(`/pacientes/${id}`, config);

        const pacientesActualizado = pacientes.filter(
          pacientesState => pacientesState._id !== id
        );
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        setPatients,
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;

/* 
juan1@juan.com
* a3f8902 (HEAD -> main, origin/main) Public routes added
* 8f733a4 change password added
*/
