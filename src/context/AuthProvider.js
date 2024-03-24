import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);

  }, [])
  


  const [isAuthenticated, setIsAuthenticated] = useState(loggedIn);


  const login = (user) => {
    // Implement your authentication logic here
    setUser(user)
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setIsAuthenticated(false);
    setUser(null)
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };