import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'manager' | 'customer';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  restaurantId?: string; // for admin users
}

interface AuthContextType {
  user: User | null;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole, phone?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@s2o.com',
    phone: '0123456789',
    password: 'admin123',
    name: 'Admin S2O',
    role: 'admin' as UserRole,
    restaurantId: 'main',
  },
  {
    id: '2',
    email: 'manager@s2o.com',
    phone: '0987654321',
    password: 'manager123',
    name: 'Quản Lý Nhà Hàng',
    role: 'manager' as UserRole,
    restaurantId: 'main',
  },
  {
    id: '3',
    email: 'customer@test.com',
    phone: '0999888777',
    password: 'customer123',
    name: 'Trần Thị B',
    role: 'customer' as UserRole,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (emailOrPhone: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = MOCK_USERS.find(
        u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password
      );

      if (!mockUser) {
        throw new Error('Email hoặc mật khẩu không đúng');
      }

      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole, phone?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email đã được sử dụng');
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        phone,
        name,
        role,
      };

      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}