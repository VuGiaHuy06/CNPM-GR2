import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, UserPlus, Mail, Phone, Shield, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { UserRole } from '../contexts/AuthContext';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  restaurantId?: string;
  restaurantName?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export function UserManagement() {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'Admin S2O',
      email: 'admin@s2o.com',
      phone: '0123456789',
      role: 'admin',
      status: 'active',
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      name: 'Quản Lý Nhà Hàng',
      email: 'manager@s2o.com',
      phone: '0987654321',
      role: 'manager',
      restaurantId: 'main',
      restaurantName: 'Nhà Hàng S2O Chính',
      status: 'active',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '3',
      name: 'Trần Thị B',
      email: 'customer@test.com',
      phone: '0999888777',
      role: 'customer',
      status: 'active',
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '4',
      name: 'Nguyễn Văn C',
      email: 'manager2@s2o.com',
      phone: '0888777666',
      role: 'manager',
      restaurantId: 'branch-1',
      restaurantName: 'Nhà Hàng S2O Chi Nhánh 1',
      status: 'active',
      createdAt: new Date('2024-02-10'),
    },
    {
      id: '5',
      name: 'Lê Thị D',
      email: 'customer2@test.com',
      phone: '0777666555',
      role: 'customer',
      status: 'active',
      createdAt: new Date('2024-02-15'),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer' as UserRole,
    password: '',
  });

  const roleLabels: Record<UserRole, string> = {
    admin: 'Quản Trị Viên',
    manager: 'Quản Lý',
    customer: 'Khách Hàng',
  };

  const roleColors: Record<UserRole, string> = {
    admin: 'bg-red-100 text-red-800',
    manager: 'bg-blue-100 text-blue-800',
    customer: 'bg-green-100 text-green-800',
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.password) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const user: UserData = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: 'active',
      createdAt: new Date(),
    };

    setUsers([...users, user]);
    toast.success(`Đã thêm người dùng ${newUser.name}`);
    setShowAddDialog(false);
    setNewUser({ name: '', email: '', phone: '', role: 'customer', password: '' });
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(u => u.id !== userId));
    toast.success(`Đã xóa người dùng ${user?.name}`);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'active' ? 'inactive' : 'active';
        toast.success(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} người dùng ${u.name}`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  const stats = [
    { label: 'Tổng Người Dùng', value: users.length, color: 'text-blue-600' },
    { label: 'Quản Trị Viên', value: users.filter(u => u.role === 'admin').length, color: 'text-red-600' },
    { label: 'Quản Lý', value: users.filter(u => u.role === 'manager').length, color: 'text-purple-600' },
    { label: 'Khách Hàng', value: users.filter(u => u.role === 'customer').length, color: 'text-green-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Quản Lý Người Dùng</h2>
        <p className="text-gray-500 mt-1">Quản lý tất cả người dùng trong hệ thống</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Lọc theo vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
                <SelectItem value="manager">Quản lý</SelectItem>
                <SelectItem value="customer">Khách hàng</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Thêm Người Dùng
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm Người Dùng Mới</DialogTitle>
                  <DialogDescription>
                    Điền thông tin để tạo tài khoản người dùng mới
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Họ và tên</label>
                    <Input
                      placeholder="Nhập họ tên"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Số điện thoại</label>
                    <Input
                      placeholder="0123456789"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mật khẩu</label>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vai trò</label>
                    <Select value={newUser.role} onValueChange={(value: UserRole) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Khách hàng</SelectItem>
                        <SelectItem value="manager">Quản lý</SelectItem>
                        <SelectItem value="admin">Quản trị viên</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddUser}>
                    Thêm Người Dùng
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Người Dùng ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Người dùng</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Liên hệ</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Vai trò</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Nhà hàng</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ngày tạo</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={roleColors[user.role]}>
                        <Shield className="w-3 h-3 mr-1" />
                        {roleLabels[user.role]}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {user.restaurantName ? (
                        <span className="text-sm text-gray-900">{user.restaurantName}</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {user.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {user.createdAt.toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          {user.status === 'active' ? 'Vô hiệu' : 'Kích hoạt'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
