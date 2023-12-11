import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  user: { email: '', isAuthenticated: false },
  login: () => {},
  logout: () => {},
});

export const AuthData = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({ email: '', isAuthenticated: false });

  const login = async (email: string, password: string) => {
    console.log('Se ha ejecutado la función login');
    const formData = { email, password };
    console.log(formData);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('respuesta ok');
        const result = await response.json();
        setUser({ email: result.user.email, isAuthenticated: true });
        console.log(user);
        return 'success';
      } else {
        console.log('error 1');
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log('error 2');
      throw new Error('Failed to log in: ' + error);
    }
  };
  const logout = () => {
    setUser({ ...user, isAuthenticated: false });
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
