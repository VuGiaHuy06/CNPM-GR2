import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Settings, Database, Bell, Mail, Shield, Server, Save, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function SystemConfiguration() {
  const [config, setConfig] = useState({
    siteName: 'S2O - Scan to Order',
    supportEmail: 'support@s2o.com',
    maxRestaurants: '100',
    sessionTimeout: '30',
    enableNotifications: true,
    enableEmailVerification: true,
    enableSMS: false,
    maintenanceMode: false,
  });

  const handleSave = () => {
    toast.success('Đã lưu cấu hình hệ thống');
  };

  const handleReset = () => {
    setConfig({
      siteName: 'S2O - Scan to Order',
      supportEmail: 'support@s2o.com',
      maxRestaurants: '100',
      sessionTimeout: '30',
      enableNotifications: true,
      enableEmailVerification: true,
      enableSMS: false,
      maintenanceMode: false,
    });
    toast.info('Đã khôi phục cấu hình mặc định');
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Cấu Hình Hệ Thống</h2>
        <p className="text-gray-500 mt-1">Quản lý các thiết lập và cấu hình của hệ thống</p>
      </div>

      {/* System Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Trạng Thái Hệ Thống
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Server Status</p>
                <p className="text-lg font-bold text-green-600">Online</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Database</p>
                <p className="text-lg font-bold text-blue-600">Connected</p>
              </div>
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-lg font-bold text-purple-600">99.9%</p>
              </div>
              <RefreshCw className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Cài Đặt Chung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tên hệ thống</label>
              <Input
                value={config.siteName}
                onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                placeholder="Tên hệ thống"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email hỗ trợ</label>
              <Input
                type="email"
                value={config.supportEmail}
                onChange={(e) => setConfig({ ...config, supportEmail: e.target.value })}
                placeholder="support@s2o.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Số nhà hàng tối đa</label>
              <Input
                type="number"
                value={config.maxRestaurants}
                onChange={(e) => setConfig({ ...config, maxRestaurants: e.target.value })}
                placeholder="100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Thời gian phiên (phút)</label>
              <Input
                type="number"
                value={config.sessionTimeout}
                onChange={(e) => setConfig({ ...config, sessionTimeout: e.target.value })}
                placeholder="30"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Tính Năng
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Thông báo Push</p>
                <p className="text-sm text-gray-500">Gửi thông báo realtime cho người dùng</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.enableNotifications}
                onChange={(e) => setConfig({ ...config, enableNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Xác thực Email</p>
                <p className="text-sm text-gray-500">Yêu cầu xác thực email khi đăng ký</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.enableEmailVerification}
                onChange={(e) => setConfig({ ...config, enableEmailVerification: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Thông báo SMS</p>
                <p className="text-sm text-gray-500">Gửi SMS cho khách hàng</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.enableSMS}
                onChange={(e) => setConfig({ ...config, enableSMS: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">Chế độ bảo trì</p>
                <p className="text-sm text-gray-500">Tạm khóa truy cập hệ thống</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.maintenanceMode}
                onChange={(e) => setConfig({ ...config, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Database Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Thông Tin Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Tổng số bản ghi</p>
              <p className="text-2xl font-bold text-gray-900">12,458</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Dung lượng sử dụng</p>
              <p className="text-2xl font-bold text-gray-900">2.4 GB</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Lần backup cuối</p>
              <p className="text-2xl font-bold text-gray-900">Hôm nay</p>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <Button variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Backup Database
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Tối ưu hóa
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline" onClick={handleReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Khôi phục mặc định
        </Button>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Lưu cấu hình
        </Button>
      </div>
    </div>
  );
}
