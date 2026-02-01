import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import { TableProvider } from './contexts/TableContext';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { OrderTableSync } from './components/OrderTableSync';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { MenuManagement } from './components/MenuManagement';
import { OrderManagement } from './components/OrderManagement';
import { TableManagement } from './components/TableManagement';
import { QRCodeGeneration } from './components/QRCodeGeneration';
import { RevenueAnalytics } from './components/RevenueAnalytics';
import { Toaster } from './components/ui/sonner';

export type ViewType = 'dashboard' | 'menu' | 'orders' | 'tables' | 'qr' | 'revenue';

function AppContent() {
  const { user } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedBranch, setSelectedBranch] = useState('main');

  // If not logged in, show login/register
  if (!user) {
    if (authView === 'login') {
      return <LoginPage onSwitchToRegister={() => setAuthView('register')} />;
    }
    return <RegisterPage onSwitchToLogin={() => setAuthView('login')} />;
  }

  // Customer view
  if (user.role === 'customer') {
    return (
      <>
        <OrderTableSync />
        <CustomerDashboard />
      </>
    );
  }

  // Admin view - full system management
  if (user.role === 'admin') {
    return (
      <>
        <OrderTableSync />
        <AdminDashboard />
      </>
    );
  }

  // Manager view - restaurant management only
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView selectedBranch={selectedBranch} />;
      case 'menu':
        return <MenuManagement selectedBranch={selectedBranch} />;
      case 'orders':
        return <OrderManagement selectedBranch={selectedBranch} />;
      case 'tables':
        return <TableManagement selectedBranch={selectedBranch} />;
      case 'qr':
        return <QRCodeGeneration selectedBranch={selectedBranch} />;
      case 'revenue':
        return <RevenueAnalytics selectedBranch={selectedBranch} />;
      default:
        return <DashboardView selectedBranch={selectedBranch} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TableProvider>
        <OrderProvider>
          <AppContent />
          <Toaster />
        </OrderProvider>
      </TableProvider>
    </AuthProvider>
  );
}