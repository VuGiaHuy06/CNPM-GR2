import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UtensilsCrossed, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface LoginPageProps {
  onSwitchToRegister: () => void;
}

export function LoginPage({ onSwitchToRegister }: LoginPageProps) {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.emailOrPhone || !formData.password) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      await login(formData.emailOrPhone, formData.password);
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
            <UtensilsCrossed className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">S2O Manager</CardTitle>
            <p className="text-gray-500 mt-2">Đăng nhập vào hệ thống</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="emailOrPhone">Email hoặc Số điện thoại</Label>
              <Input
                id="emailOrPhone"
                type="text"
                placeholder="your@email.com hoặc 0123456789"
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-orange-600 hover:text-orange-700">
                Quên mật khẩu?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                'Đăng nhập'
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Đăng ký ngay
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">
              Tài khoản demo:
            </p>
            <div className="space-y-2 text-xs">
              <div className="bg-red-50 p-2 rounded border border-red-200">
                <p className="font-medium text-red-800">Admin: admin@s2o.com / admin123</p>
                <p className="text-red-600 text-[10px] mt-0.5">Quản trị hệ thống, quản lý người dùng, cấu hình</p>
              </div>
              <div className="bg-blue-50 p-2 rounded border border-blue-200">
                <p className="font-medium text-blue-800">Manager: manager@s2o.com / manager123</p>
                <p className="text-blue-600 text-[10px] mt-0.5">Quản lý nhà hàng, menu, đơn hàng, bàn</p>
              </div>
              <div className="bg-green-50 p-2 rounded border border-green-200">
                <p className="font-medium text-green-800">Khách hàng: customer@test.com / customer123</p>
                <p className="text-green-600 text-[10px] mt-0.5">Đặt món, theo dõi đơn hàng</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}