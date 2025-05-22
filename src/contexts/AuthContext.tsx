import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

// Define user types
type UserRole = 'user' | 'admin';

export interface User {
  email: string;
  password: string; // In a real app, we wouldn't store passwords in the client
  role: UserRole;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Initial users
const initialUsers: User[] = [
  { email: 'admin@deepvisas.com', password: 'password123', role: 'admin' },
  { email: 'user@deepvisas.com', password: 'password123', role: 'user' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(
    () => {
      // Load users from localStorage or use initial users
      const storedUsers = localStorage.getItem('deepvisas_users');
      return storedUsers ? JSON.parse(storedUsers) : initialUsers;
    }
  );
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('deepvisas_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('deepvisas_user');
      }
    }

    // Save initial users to localStorage if not already there
    if (!localStorage.getItem('deepvisas_users')) {
      localStorage.setItem('deepvisas_users', JSON.stringify(initialUsers));
    }
  }, []);

  // Keep users persisted in localStorage when they change
  useEffect(() => {
    localStorage.setItem('deepvisas_users', JSON.stringify(users));
  }, [users]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('deepvisas_user', JSON.stringify(foundUser));
      
      // Redirect based on role
      if (foundUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }

    // Create new user
    const newUser: User = { 
      email, 
      password, 
      role: 'user' 
    };
    
    setUsers([...users, newUser]);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('deepvisas_user');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
