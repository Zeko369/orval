import axios from 'axios';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
type Dispatch = (Auth: string) => void;

type AuthProviderProps = { children: ReactNode; initialState?: string | null };

const AuthContext = createContext<string | null>(null);
const AuthDispatchContext = createContext<Dispatch | null>(null);

const AuthProvider = ({ children, initialState = null }: AuthProviderProps) => {
  // it's a quick demo with useState but you can also have a more complexe state with a useReducer
  const [token, setToken] = useState(initialState);

  useEffect(() => {
    const interceptorId = axios.interceptors.request.use(
      (config) => {
        return {
          ...config,
          baseURL: '', // use an env or your api url
          headers: token
            ? {
                ...config.headers,
                Authorization: `Bearer ${token}`,
              }
            : config.headers,
        };
      },
      (error) => {
        Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(interceptorId);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={token}>
      <AuthDispatchContext.Provider value={setToken}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

const useAuth = (): string | null => {
  return useContext<string | null>(AuthContext);
};

const useAuthDispatch = (): Dispatch => {
  const context = useContext<Dispatch | null>(AuthDispatchContext);

  if (context === null) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, useAuthDispatch };
