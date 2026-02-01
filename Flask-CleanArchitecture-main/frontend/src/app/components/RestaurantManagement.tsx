import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from './ui/dialog';
import { Search, Store, MapPin, Phone, Mail, Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  managerName: string;
  status: 'active' | 'inactive';
  tables: number;
  orders: number;
  revenue: number;
  createdAt: Date;
}

export function RestaurantManagement() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 'main',
      name: 'Nhà Hàng S2O Chính',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      phone: '0987654321',
      email: 'manager@s2o.com',
      managerName: 'Quản Lý Nhà Hàng',
      status: 'active',
      tables: 12,
      orders: 156,
      revenue: 45000000,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: 'branch-1',
      name: 'Nhà Hàng S2O Chi Nhánh 1',
      address: '456 Đường XYZ, Quận 3, TP.HCM',
      phone: '0888777666',
      email: 'branch1@s2o.com',
      managerName: 'Nguyễn Văn C',
      status: 'active',
      tables: 10,
      orders: 98,
      revenue: 28000000,
      createdAt: new Date('2024-02-10'),
    },
    {
      id: 'branch-2',
      name: 'Nhà Hàng S2O Chi Nhánh 2',
      address: '789 Đường DEF, Quận 5, TP.HCM',
      phone: '0777666555',
      email: 'branch2@s2o.com',
      managerName: 'Trần Văn E',
      status: 'active',
      tables: 8,
      orders: 67,
      revenue: 18500000,
      createdAt: new Date('2024-02-20'),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    managerName: '',
    tables: '',
  });

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRestaurant = () => {
    if (!newRestaurant.name || !newRestaurant.address || !newRestaurant.phone || !newRestaurant.email || !newRestaurant.managerName || !newRestaurant.tables) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const restaurant: Restaurant = {
      id: Date.now().toString(),
      name: newRestaurant.name,
      address: newRestaurant.address,
      phone: newRestaurant.phone,
      email: newRestaurant.email,
      managerName: newRestaurant.managerName,
      status: 'active',
      tables: parseInt(newRestaurant.tables),
      orders: 0,
      revenue: 0,
      createdAt: new Date(),
    };

    setRestaurants([...restaurants, restaurant]);
    toast.success(`Đã thêm nhà hàng ${newRestaurant.name}`);
    setShowAddDialog(false);
    setNewRestaurant({ name: '', address: '', phone: '', email: '', managerName: '', tables: '' });
  };

  const handleDeleteRestaurant = (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    setRestaurants(restaurants.filter(r => r.id !== restaurantId));
    toast.success(`Đã xóa nhà hàng ${restaurant?.name}`);
  };

  const handleToggleStatus = (restaurantId: string) => {
    setRestaurants(restaurants.map(r => {
      if (r.id === restaurantId) {
        const newStatus = r.status === 'active' ? 'inactive' : 'active';
        toast.success(`Đã ${newStatus === 'active' ? 'kích hoạt' : 'vô hiệu hóa'} nhà hàng ${r.name}`);
        return { ...r, status: newStatus };
      }
      return r;
    }));
  };

  const totalStats = {
    restaurants: restaurants.length,
    activeRestaurants: restaurants.filter(r => r.status === 'active').length,
    totalTables: restaurants.reduce((sum, r) => sum + r.tables, 0),
    totalOrders: restaurants.reduce((sum, r) => sum + r.orders, 0),
    totalRevenue: restaurants.reduce((sum, r) => sum + r.revenue, 0),
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Quản Lý Nhà Hàng</h2>
        <p className="text-gray-500 mt-1">Quản lý tất cả nhà hàng trong hệ thống S2O</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Tổng Nhà Hàng</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{totalStats.restaurants}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Đang Hoạt Động</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{totalStats.activeRestaurants}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Tổng Bàn</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{totalStats.totalTables}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Doanh Thu</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {(totalStats.totalRevenue / 1000000).toFixed(1)}M
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm nhà hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm Nhà Hàng
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Thêm Nhà Hàng Mới</DialogTitle>
                  <DialogDescription>
                    Điền thông tin để thêm nhà hàng vào hệ thống
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tên nhà hàng</label>
                    <Input
                      placeholder="Nhà Hàng ABC"
                      value={newRestaurant.name}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Số bàn</label>
                    <Input
                      type="number"
                      placeholder="12"
                      value={newRestaurant.tables}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, tables: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium">Địa chỉ</label>
                    <Input
                      placeholder="123 Đường ABC, Quận 1, TP.HCM"
                      value={newRestaurant.address}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Số điện thoại</label>
                    <Input
                      placeholder="0123456789"
                      value={newRestaurant.phone}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="restaurant@example.com"
                      value={newRestaurant.email}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium">Tên người quản lý</label>
                    <Input
                      placeholder="Nguyễn Văn A"
                      value={newRestaurant.managerName}
                      onChange={(e) => setNewRestaurant({ ...newRestaurant, managerName: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddRestaurant}>
                    Thêm Nhà Hàng
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                    <Store className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                    <Badge className={restaurant.status === 'active' ? 'bg-green-100 text-green-800 mt-1' : 'bg-gray-100 text-gray-800 mt-1'}>
                      {restaurant.status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{restaurant.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{restaurant.tables}</p>
                  <p className="text-xs text-gray-500">Bàn</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{restaurant.orders}</p>
                  <p className="text-xs text-gray-500">Đơn hàng</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {(restaurant.revenue / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-gray-500">Doanh thu</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t text-sm text-gray-600">
                <p><span className="font-medium">Quản lý:</span> {restaurant.managerName}</p>
                <p><span className="font-medium">Ngày tạo:</span> {restaurant.createdAt.toLocaleDateString('vi-VN')}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleToggleStatus(restaurant.id)}
                >
                  {restaurant.status === 'active' ? 'Tạm ngưng' : 'Kích hoạt'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteRestaurant(restaurant.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
