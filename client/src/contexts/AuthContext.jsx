import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('fitSyncXUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('fitSyncXUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = { id: '1', email: email, name: 'Mock User' }; 
        localStorage.setItem('fitSyncXUser', JSON.stringify(mockUser));
        setUser(mockUser);
        toast({
          title: "Login Successful! 🎉",
          description: `Welcome back, ${mockUser.name}!`,
          variant: "default",
          className: "bg-primary text-primary-foreground",
        });
        setLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  const signup = (name, email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUser = { id: Date.now().toString(), email: email, name: name };
        localStorage.setItem('fitSyncXUser', JSON.stringify(mockUser));
        setUser(mockUser);
        toast({
          title: "Sign Up Successful! 🚀",
          description: `Welcome to FitSyncX, ${mockUser.name}!`,
          variant: "default",
          className: "bg-primary text-primary-foreground",
        });
        setLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('fitSyncXUser');
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "default",
    });
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};