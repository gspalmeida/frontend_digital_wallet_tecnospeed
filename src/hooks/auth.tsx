import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import api from '../services/api';

interface UserProps {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  walletBalance:string;
}

interface AdminProps {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  token: string;
  user?: UserProps;
  admin?: AdminProps;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  admin?: AdminProps;
  user?: UserProps;
  loading: boolean;
  signIn(credentials: SingInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [session, setSession] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedSession(): Promise<void> {
      const token = localStorage.getItem('@dwt:token');
      const admin = localStorage.getItem('@dwt:admin');
      const user = localStorage.getItem('@dwt:user');

      if (user !== 'undefined' && user && token) {
        setSession({
          token: token,
          user: JSON.parse(user),
        });
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setLoading(false);
      }
      if (admin !== 'undefined' && admin && token) {
        setSession({
          token: token,
          admin: JSON.parse(admin),
        });
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setLoading(false);
      }
      setLoading(false);
    }
    loadStoragedSession();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth', {
      email,
      password,
    });

    const { token, user, admin } = response.data;
    
    localStorage.setItem('@dwt:token', token);
    localStorage.setItem('@dwt:user', JSON.stringify(user));
    localStorage.setItem('@dwt:admin', JSON.stringify(admin));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setSession({ token, user, admin });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@dwt:token');
    localStorage.removeItem('@dwt:user');
    localStorage.removeItem('@dwt:admin');
    api.defaults.headers.Authorization = undefined;
    setSession({} as AuthState);
    window.location.reload();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: session.user,
        admin: session.admin,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    console.error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
