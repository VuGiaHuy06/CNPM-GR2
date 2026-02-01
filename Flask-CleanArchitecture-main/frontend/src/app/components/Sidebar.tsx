import { LayoutDashboard, UtensilsCrossed, ShoppingCart, Table2, QrCode, TrendingUp, Building2, LogOut } from 'lucide-react';
import { ViewType } from '../App';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Bảng Điều Khiển', icon: LayoutDashboard },
  { id: 'menu' as ViewType, label: 'Quản Lý Thực Đơn', icon: UtensilsCrossed },
  { id: 'orders' as ViewType, label: 'Đơn Hàng', icon: ShoppingCart },
  { id: 'tables' as ViewType, label: 'Bàn Ăn', icon: Table2 },
  { id: 'qr' as ViewType, label: 'Mã QR', icon: QrCode },
  { id: 'revenue' as ViewType, label: 'Doanh Thu', icon: TrendingUp },
];

const branches = [
  { id: 'main', name: 'Chi Nhánh Chính - Trung Tâm' },
  { id: 'north', name: 'Chi Nhánh Phía Bắc' },
  { id: 'south', name: 'Chi Nhánh Phía Nam' },
];

export function Sidebar({ currentView, setCurrentView, selectedBranch, setSelectedBranch }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">S2O Manager</h1>
            <p className="text-xs text-gray-500">Quản Lý Nhà Hàng</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs text-gray-500 flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            Chi Nhánh
          </label>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {branches.map(branch => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span>JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">Quản Lý</p>
          </div>
        </div>
        <Button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors bg-red-50 text-red-600 hover:bg-red-100"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng Xuất</span>
        </Button>
      </div>
    </aside>
  );
}