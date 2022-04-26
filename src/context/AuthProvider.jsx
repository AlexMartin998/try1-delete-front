import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';
// juan1@juan.com
const AuthContext = createContext();

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

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const config = validateTokenFromLS();
      if (!config) return setCargando(false);

      try {
        const { data } = await clienteAxios('/veterinarios/perfil', config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setAuth({});
  };

  const actualizarPerfil = async datos => {
    const config = validateTokenFromLS();
    if (!config) return setCargando(false);

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      await clienteAxios.put(url, datos, config);

      return {
        msg: 'Almacenado Correctamente',
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async datos => {
    const config = validateTokenFromLS();
    if (!config) return setCargando(false);

    try {
      const url = '/veterinarios/actualizar-password';

      const { data } = await clienteAxios.put(url, datos, config);
      console.log(data);

      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
