import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

interface MenuManagementProps {
  selectedBranch: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  discount?: number;
}

const initialMenuItems: MenuItem[] = [
  { id: '1', name: 'Cá Hồi Nướng', description: 'Cá hồi Đại Tây Dương tươi với thảo mộc', price: 625000, category: 'Món Chính', available: true },
  { id: '2', name: 'Salad Caesar', description: 'Caesar truyền thống với bánh mì nướng giòn', price: 325000, category: 'Khai Vị', available: true, discount: 10 },
  { id: '3', name: 'Pizza Margherita', description: 'Pizza Ý truyền thống', price: 475000, category: 'Món Chính', available: true },
  { id: '4', name: 'Tiramisu', description: 'Món tráng miệng Ý cổ điển', price: 225000, category: 'Tráng Miệng', available: false },
];

const categories = ['Khai Vị', 'Món Chính', 'Tráng Miệng', 'Đồ Uống'];

export function MenuManagement({ selectedBranch }: MenuManagementProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Món Chính',
    available: true,
    discount: '',
  });

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      toast.error('Vui lòng điền đầy đủ các trường bắt buộc');
      return;
    }

    if (editingItem) {
      setMenuItems(menuItems.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData, price: parseFloat(formData.price), discount: formData.discount ? parseFloat(formData.discount) : undefined }
          : item
      ));
      toast.success('Đã cập nhật món ăn thành công');
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        available: formData.available,
        discount: formData.discount ? parseFloat(formData.discount) : undefined,
      };
      setMenuItems([...menuItems, newItem]);
      toast.success('Đã thêm món ăn thành công');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      available: item.available,
      discount: item.discount?.toString() || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast.success('Đã xóa món ăn');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Món Chính',
      available: true,
      discount: '',
    });
    setEditingItem(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Quản Lý Thực Đơn</h2>
          <p className="text-gray-500 mt-1">Quản lý các món ăn trong nhà hàng của bạn</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Thêm Món
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md" aria-describedby="menu-item-form">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Chỉnh Sửa Món Ăn' : 'Thêm Món Ăn Mới'}</DialogTitle>
              <DialogDescription>
                {editingItem ? 'Cập nhật thông tin cho món ăn này' : 'Thêm một món ăn mới vào thực đơn'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4" id="menu-item-form">
              <div>
                <Label htmlFor="name">Tên Món *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tên món ăn"
                />
              </div>
              <div>
                <Label htmlFor="description">Mô Tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả món ăn"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Giá *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Giảm Giá %</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Danh Mục</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="available" className="cursor-pointer">Còn hàng</Label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="flex-1 bg-orange-600 hover:bg-orange-700">
                  Lưu
                </Button>
                <Button
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Hủy
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm món ăn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tất cả danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className={!item.available ? 'opacity-60' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                  {item.discount && (
                    <span className="ml-2 text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                      -{item.discount}%
                    </span>
                  )}
                </div>
                <div className={`px-3 py-1 rounded text-sm ${
                  item.available 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {item.available ? 'Còn hàng' : 'Hết hàng'}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}