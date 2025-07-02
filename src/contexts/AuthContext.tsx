import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (storedUser && rememberMe) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
      }
    }
    
    setLoading(false);
  }, []);

  const isAdmin = user?.email === 'admin@workexe.co';

  const login = async (email: string, password: string, rememberMe = false) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      if (email === 'admin@workexe.co' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@workexe.co',
          plan: 'enterprise',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
          emailVerified: true,
          createdAt: '2024-01-01'
        };
        setUser(adminUser);
        
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(adminUser));
          localStorage.setItem('rememberMe', 'true');
        }
        
        toast.success('Welcome back, Admin!', { duration: 1000 });
      } else if (email === 'pro@workexe.co' && password === 'pro123') {
        const proUser: User = {
          id: '3',
          name: 'Professional User',
          email: 'pro@workexe.co',
          plan: 'professional',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
          emailVerified: true,
          createdAt: '2024-02-15'
        };
        setUser(proUser);
        
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(proUser));
          localStorage.setItem('rememberMe', 'true');
        }
        
        toast.success('Welcome back, Professional User!', { duration: 1000 });
      } else if (email && password) {
        const regularUser: User = {
          id: '2',
          name: email.split('@')[0],
          email,
          plan: 'free',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
          emailVerified: true,
          createdAt: '2024-01-01'
        };
        setUser(regularUser);
        
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(regularUser));
          localStorage.setItem('rememberMe', 'true');
        }
        
        toast.success('Login successful!', { duration: 1000 });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Invalid email or password', { duration: 1000 });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        plan: 'free',
        emailVerified: false,
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      toast.success('Registration successful! Please verify your email.', { duration: 1000 });
    } catch (error) {
      toast.error('Registration failed. Please try again.', { duration: 1000 });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    toast.success('Logged out successfully', { duration: 1000 });
  };

  const forgotPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Password reset email sent!', { duration: 1000 });
  };

  const resetPassword = async (token: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Password reset successful!', { duration: 1000 });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      toast.success('Profile updated successfully!', { duration: 1000 });
    } catch (error) {
      toast.error('Failed to update profile', { duration: 1000 });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      updateProfile,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};