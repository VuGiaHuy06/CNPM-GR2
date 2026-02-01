import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Users, Settings, Store, LayoutDashboard, UserCog, Database } from 'lucide-react';
import { UserManagement } from './UserManagement';
import { SystemConfiguration } from './SystemConfiguration';
import { RestaurantManagement } from './RestaurantManagement';

type AdminView = 'dashboard' | 'users' | 'restaurants' | 'settings';

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const stats = [
    { label: 'Tổng Người Dùng', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { label: 'Nhà Hàng Hoạt Động', value: '45', icon: Store, color: 'bg-green-500' },
    { label: 'Đơn Hàng Hôm Nay', value: '892', icon: Database, color: 'bg-purple-500' },
    { label: 'Doanh Thu Tháng', value: '₫125M', icon: LayoutDashboard, color: 'bg-orange-500' },
  ];

  const menuItems = [
    { id: 'dashboard' as AdminView, label: 'Tổng Quan', icon: LayoutDashboard },
    { id: 'users' as AdminView, label: 'Quản Lý Người Dùng', icon: UserCog },
    { id: 'restaurants' as AdminView, label: 'Quản Lý Nhà Hàng', icon: Store },
    { id: 'settings' as AdminView, label: 'Cấu Hình Hệ Thống', icon: Settings },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'users':
        return <UserManagement />;
      case 'restaurants':
        return <RestaurantManagement />;
      case 'settings':
        return <SystemConfiguration />;
      default:
        return (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Tổng Quan Hệ Thống</h2>
              <p className="text-gray-500 mt-1">Thống kê tổng quan về nền tảng S2O</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Hoạt Động Gần Đây</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Nhà hàng mới đăng ký', name: 'Nhà Hàng ABC', time: '5 phút trước' },
                      { action: 'Người dùng mới', name: 'Nguyễn Văn A', time: '15 phút trước' },
                      { action: 'Đơn hàng hoàn thành', name: 'Bàn B05', time: '25 phút trước' },
                      { action: 'Cập nhật menu', name: 'Nhà Hàng XYZ', time: '1 giờ trước' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-3">
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.name}</p>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Thông Báo Hệ Thống</h3>
                  <div className="space-y-4">
                    {[
                      { type: 'success', message: 'Hệ thống đang hoạt động bình thường', time: 'Hôm nay' },
                      { type: 'warning', message: '3 nhà hàng cần xác minh tài khoản', time: 'Hôm nay' },
                      { type: 'info', message: 'Bản cập nhật v2.1 đã sẵn sàng', time: 'Hôm qua' },
                      { type: 'success', message: 'Sao lưu dữ liệu hoàn tất', time: 'Hôm qua' },
                    ].map((notification, index) => (
                      <div key={index} className="flex items-start gap-3 border-b pb-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <span className="text-xs text-gray-400">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S2O</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Quản trị viên hệ thống</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-orange-50 text-orange-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
